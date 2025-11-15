import {
  Controller,
  Get,
  Post as HttpPost,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // GET all posts
  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  // CREATE POST
  @UseGuards(JwtAuthGuard)
  @HttpPost()
  createPost(@Body() dto: CreatePostDto, @Req() req: any) {
    return this.postsService.create(dto, req.user.id);
  }

  // UPDATE POST
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePost(
    @Param('id') id: number,
    @Body() dto: UpdatePostDto,
    @Req() req: any,
  ) {
    return this.postsService.update(id, dto, req.user.id);
  }

  // DELETE POST
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removePost(@Param('id') id: number, @Req() req: any) {
    return this.postsService.remove(id, req.user.id);
  }

  // ADD COMMENT
  @UseGuards(JwtAuthGuard)
  @HttpPost(':postId/comments')
  addComment(
    @Param('postId') postId: number,
    @Body() dto: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.postsService.addComment(postId, dto, req.user.id);
  }

  // UPDATE COMMENT  ← THIS FIXES YOUR 404
  @UseGuards(JwtAuthGuard)
  @Patch(':postId/comments/:commentId')
  updateComment(
    @Param('postId') postId: number,
    @Param('commentId') commentId: number,
    @Body() dto: UpdateCommentDto,
    @Req() req: any,
  ) {
    return this.postsService.updateComment(commentId, dto, req.user.id);
  }

  // DELETE COMMENT  ← THIS FIXES YOUR 404
  @UseGuards(JwtAuthGuard)
  @Delete(':postId/comments/:commentId')
  removeComment(
    @Param('postId') postId: number,
    @Param('commentId') commentId: number,
    @Req() req: any,
  ) {
    return this.postsService.removeComment(commentId, req.user.id);
  }
}
