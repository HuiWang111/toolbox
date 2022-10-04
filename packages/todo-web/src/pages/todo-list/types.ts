export enum TodoPriority {
  Low,
  Medium,
  High
}

export interface TodoItem {
  id: number;
  priority: TodoPriority;
  title: string;
  description: string;
  date: string;
  done: boolean;
}
