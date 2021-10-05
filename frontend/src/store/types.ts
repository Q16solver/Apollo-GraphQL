export interface EventState {
  user: string;
  events: Event[];
  event: Event | null;
}

export interface Event {
  id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
}
