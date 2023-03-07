export interface Post {
  id: number;
  title: string;
  content: string;
  published?: boolean;
  dateCreated?: Date;
  lastUpdated?: Date;
}