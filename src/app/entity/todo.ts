export class Todo {
  id?: string;
  createdTime?: string;
  fields: {
    Title?: string;
    isStarred?: boolean;
    isCompleted?: boolean;
    dueDate?: string;
    startDate?: string;
    completedDate?: string;
    repeatingCount?: number;
    repeatingFrequency?: string;
    subTasks?: string;
    project?: string;
  };

  constructor(title?: string) {
    this.fields = {};
    this.fields.Title = title;
  }
}
