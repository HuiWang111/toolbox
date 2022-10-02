export interface Event {
  id: number;
  name: string;
  children?: Omit<Event, 'children'>[];
}
