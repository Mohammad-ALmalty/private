
export interface Memory {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface LoveReason {
  id: number;
  text: string;
  icon: string;
}

export enum AppSection {
  Home = 'home',
  AIWriter = 'ai-writer',
  Gallery = 'gallery',
  Reasons = 'reasons'
}
