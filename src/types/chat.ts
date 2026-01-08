export interface ChatRoom {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  isGroup: boolean;
  createdAt: Date;
  updatedAt: Date;
  members?: ChatRoomMember[];
  messages?: Message[];
}

export interface ChatRoomMember {
  id: string;
  userId: string;
  chatRoomId: string;
  role: 'admin' | 'member';
  joinedAt: Date;
  user?: {
    id: string;
    name?: string | null;
    image?: string | null;
  };
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  chatRoomId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name?: string | null;
    image?: string | null;
  };
}
