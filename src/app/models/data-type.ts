export const LocalStorageKey = 'eventList';
export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  priority: TPriority;
  isCompleted: boolean;
}

export type TPriority = 'high' | 'low';

export enum PriorityList {
  high = 'high',
  low = 'low',
}

export const PriorityImg = {
  high: './assets/images/priority_high.jpeg',
  low: './assets/images/priority_low.jpeg',
};
