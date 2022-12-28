export class Task {
  'id': number;
  'name': string;
  'description': string;
  'date_creation': string;
  'date_finish': string;
  'category': number;
}

export class TaskByCategory {
  id: number;
  tasks: Array<Task>;
}

export class TaskOrder {
  category: number;
  id: number[];
}
