import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  create(taskData: Partial<Task>) {
    const newTask = this.taskRepository.create(taskData);
    return this.taskRepository.save(newTask);
  }

  async update(id: number, taskData: Partial<Task>) {
    await this.taskRepository.update(id, taskData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.taskRepository.delete(id);
  }
}
