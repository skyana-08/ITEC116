import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // leave empty if no password
      database: 'todo_db',
      entities: [Task],
      synchronize: true, // auto-create tables (OK for dev)
    }),
    TasksModule,
  ],
})
export class AppModule {}
