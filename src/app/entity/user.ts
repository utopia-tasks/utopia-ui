export class User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  language: string;
  offsetHours: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(username?: string, password?: string, firstName?: string, lastName?: string, email?: string,
              offsetHours?: number) {
    this.username = username || '';
    this.password = password || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.offsetHours = offsetHours;
    this.language = 'English (US)';
  }
}
