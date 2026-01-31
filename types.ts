
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface OlympiadTopic {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Elite';
  description: string;
}

export enum ProgrammingLanguage {
  CPP = 'C++',
  PYTHON = 'Python',
  JAVA = 'Java',
  PASCAL = 'Pascal'
}
