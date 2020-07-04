import {Todo} from './todo';

export class Record {
  records: Todo[];
  offset: string;

  constructor() {
    this.records = [];
  }
}
