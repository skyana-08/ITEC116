import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty({ example: 1, description: 'Unique ID of the book' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'The Great Gatsby', description: 'Title of the book' })
  @Column()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'Author of the book' })
  @Column()
  author: string;

  @ApiProperty({ example: 'FANTASY', description: 'Genre of the book' })
  @Column()
  genre: string;

  @ApiProperty({
    example: 'A classic novel set in the Jazz Age...',
    description: 'Brief description of the book',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    example: '1730981819.jpg',
    description: 'Filename of the uploaded cover image',
    required: false,
  })
  @Column({ nullable: true })
  image: string;
}
