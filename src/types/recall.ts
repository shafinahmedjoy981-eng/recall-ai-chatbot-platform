export interface MemoryItem {
  id: string;
  category: 'account' | 'history' | 'preference' | 'environment' | 'constraint';
  label: string;
  value: string;
  sourceSession: string;
  sourceDate: string;
  highlighted?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  timestamp: string;
  text: string;
  recalledFacts?: {
    memoryId: string;
    label: string;
    value: string;
    origin: string;
  }[];
  triggeredMemoryUpdate?: {
    category: string;
    label: string;
    value: string;
  };
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  role: string;
  plan: string;
  lastMessage: string;
  timeAgo: string;
  activeSession: string;
  unreadCount?: number;
  avatarInitials: string;
  channel: 'Slack' | 'Web Chat' | 'Email' | 'API';
  memories: MemoryItem[];
  messages: ChatMessage[];
}
