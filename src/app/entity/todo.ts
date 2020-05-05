export class Todo {
  id?: string;
  fields: {
    Title?: string;
    isStarred?: boolean;
    isCompleted?: boolean;
  };

  constructor(title: string) {
    this.fields = {};
    this.fields.Title = title;
  }
}
