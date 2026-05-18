export class Event {
  id!: string;
  title!: string;
  description!: string;
  date!: Date;
  location!: string;
  latitude!: number | null;
  longitude!: number | null;
  category!: string;
  createdAt!: Date;
}
