interface EventState {
  user: string;
  events: Event[];
  event: Event | null;
}

interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
}
