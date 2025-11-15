import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepo: Repository<Post>,

    @InjectRepository(Comment)
    private commentsRepo: Repository<Comment>,

    private usersService: UsersService,
  ) {}

  // Get all posts
  async findAll() {
    const posts = await this.postsRepo.find({ order: { createdAt: 'DESC' } });
    return posts.map((p) => this.mapPostResponse(p));
  }

  // Create a new post
  async create(dto: CreatePostDto, userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const post = this.postsRepo.create({
      title: dto.title,
      content: dto.content,
      author: user,
    });

    const saved = await this.postsRepo.save(post);
    return this.mapPostResponse(saved);
  }

  // Update a post
  async update(id: number, dto: UpdatePostDto, userId: number) {
    const post = await this.postsRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');

    if ((post.author as any)?.id !== userId) {
      throw new ForbiddenException('You are not allowed to edit this post');
    }

    Object.assign(post, dto);
    const updated = await this.postsRepo.save(post);
    return this.mapPostResponse(updated);
  }

  // Delete a post
  async remove(id: number, userId: number) {
    const post = await this.postsRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');

    if ((post.author as any)?.id !== userId) {
      throw new ForbiddenException('You cannot delete this post');
    }

    await this.postsRepo.remove(post);
    return { success: true };
  }

  // Add comment
  async addComment(postId: number, dto: CreateCommentDto, userId: number) {
    const post = await this.postsRepo.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const comment = this.commentsRepo.create({
      text: dto.text,
      author: user,
      post,
    });

    await this.commentsRepo.save(comment);

    const updatedPost = await this.postsRepo.findOne({ where: { id: postId } });
    if (!updatedPost) throw new NotFoundException();
    return this.mapPostResponse(updatedPost);
  }

  // Update comment
  async updateComment(commentId: number, dto: UpdateCommentDto, userId: number) {
    const comment = await this.commentsRepo.findOne({ where: { id: commentId }, relations: ['author'] });
    if (!comment) throw new NotFoundException('Comment not found');

    if ((comment.author as any)?.id !== userId) {
      throw new ForbiddenException('You cannot edit this comment');
    }

    Object.assign(comment, dto);
    const updated = await this.commentsRepo.save(comment);
    return {
      id: updated.id,
      text: updated.text,
      createdAt: updated.createdAt.toISOString(),
      author: (updated.author as any)?.name ?? 'Unknown',
    };
  }

  // Delete comment
  async removeComment(commentId: number, userId: number) {
    const comment = await this.commentsRepo.findOne({ where: { id: commentId }, relations: ['author'] });
    if (!comment) throw new NotFoundException('Comment not found');

    if ((comment.author as any)?.id !== userId) {
      throw new ForbiddenException('You cannot delete this comment');
    }

    await this.commentsRepo.remove(comment);
    return { success: true };
  }

  // Helper to format response
  private mapPostResponse(post: Post) {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      author: (post.author as any)?.name ?? 'Unknown',
      comments: (post.comments || []).map((c) => ({
        id: c.id,
        text: c.text,
        createdAt: c.createdAt.toISOString(),
        author: (c.author as any)?.name ?? 'Unknown',
      })),
    };
  }
}
