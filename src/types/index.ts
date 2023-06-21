export type User = {
  id: string;
  username: string;
};

export type Call = {
  id: string;
  duration: number;
  is_archived: boolean;
  from: string;
  to: string;
  direction: 'inbound' | 'outbound';
  call_type: 'voicemail' | 'missed' | 'answered';
  via: string;
  created_at: string;
  notes: Note[];
};

export type Note = {
  id: string;
  content: string;
};
