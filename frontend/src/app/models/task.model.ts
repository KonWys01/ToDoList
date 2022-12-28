export class Task {
  'id': number;
  'name': string;
  'description': string;
  'date_creation': string;
  'date_finish': string;
  'category_id': number;
}

export class TaskByCategory {
  id: number;
  tasks: Array<Task>;
}

export class TaskOrder {
  category: number;
  id: number[];
}

export class TaskEdit {
  name?: string;
  description?: string;
  category: number;
}
