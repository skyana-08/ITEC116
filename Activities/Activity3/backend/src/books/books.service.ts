import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  // Create book
  async create(data: Partial<Book>): Promise<Book> {
    const book = this.bookRepository.create(data);
    return this.bookRepository.save(book);
  }

  // Get all books
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  // Update book
  async update(id: number, updateData: Partial<Book>): Promise<Book | null> {
    await this.bookRepository.update(id, updateData);
    return this.bookRepository.findOne({ where: { id } });
  }

  // Delete book
  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.bookRepository.delete(id);
    return { deleted: true };
  }
}
