import {
  IsNotEmpty,
  IsString,
  IsISO8601,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title!: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description!: string;

  @IsNotEmpty({ message: 'Date is required' })
  @IsISO8601({}, { message: 'Date must be a valid ISO 8601 date string' })
  date!: string;

  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'Location must be a string' })
  location!: string;

  @IsOptional()
  @IsNumber({}, { message: 'Latitude must be a number' })
  latitude?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Longitude must be a number' })
  longitude?: number;

  @IsNotEmpty({ message: 'Category is required' })
  @IsString({ message: 'Category must be a string' })
  category!: string;
}
