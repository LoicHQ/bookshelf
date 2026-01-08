'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { Message } from '@/types';

interface UseChatOptions {
  roomId: string;
  userId?: string;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  isConnected: boolean;
}

export function useChat({ roomId, userId }: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Charger les messages initiaux
  const loadMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/chat?roomId=${roomId}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des messages');
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  // S'abonner aux nouveaux messages via Supabase Realtime
  useEffect(() => {
    loadMessages();

    // Créer le channel Supabase pour les mises à jour en temps réel
    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Message',
          filter: `chatRoomId=eq.${roomId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => {
            // Éviter les doublons
            if (prev.some((m) => m.id === newMessage.id)) {
              return prev;
            }
            return [...prev, newMessage];
          });
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    channelRef.current = channel;

    // Cleanup
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [roomId, loadMessages]);

  // Envoyer un message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !userId) return;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId,
            userId,
            content: content.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du message");
        }

        // Le message sera ajouté via le subscription Realtime
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
        throw err;
      }
    },
    [roomId, userId]
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    isConnected,
  };
}

export default useChat;
