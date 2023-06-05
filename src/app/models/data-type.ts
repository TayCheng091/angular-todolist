export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isCompleted: boolean;
}

export const LocalStorageKey = 'eventList';
