import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/chat?roomId=xxx - Récupérer les messages d'une room
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');

    if (!roomId) {
      return NextResponse.json({ error: 'roomId requis' }, { status: 400 });
    }

    // Vérifier que l'utilisateur est membre de la room
    const membership = await prisma.chatRoomMember.findUnique({
      where: {
        userId_chatRoomId: {
          userId: session.user.id,
          chatRoomId: roomId,
        },
      },
    });

    if (!membership) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    // Récupérer les messages
    const messages = await prisma.message.findMany({
      where: { chatRoomId: roomId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
      take: 100, // Limiter à 100 messages
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages' },
      { status: 500 }
    );
  }
}

// POST /api/chat - Envoyer un message
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { roomId, content } = body;

    if (!roomId || !content?.trim()) {
      return NextResponse.json(
        { error: 'roomId et content requis' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur est membre de la room
    const membership = await prisma.chatRoomMember.findUnique({
      where: {
        userId_chatRoomId: {
          userId: session.user.id,
          chatRoomId: roomId,
        },
      },
    });

    if (!membership) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    // Créer le message
    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        userId: session.user.id,
        chatRoomId: roomId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
