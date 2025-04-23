import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { RoleGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/role.decorator';
import { UserRole } from '@marketplace/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('review')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }


  @Get(':providerId')
  findAll(@Param('providerId') providerId: string) {
    return this.reviewService.findAll(+providerId);
  }

  @Get(':providerId')
  findAllByMe(@Req() req: Request) {
    return this.reviewService.findAllByMe(req);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @Request() req: Request) {
    return this.reviewService.update(id, updateReviewDto, req);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: Request) {
    return this.reviewService.remove(id, req);
  }
}
