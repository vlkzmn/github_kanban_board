export interface Task {
  id: string;
  title: string;
  opened: string;
  admin: string;
  comments: number;
  state: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface DataIssues {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

export interface NormalizedIssues {
  columnId: string;
  column: Column;
  tasks: Task[];
}
