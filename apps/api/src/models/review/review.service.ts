import { ForbiddenException, Injectable, Logger, NotFoundException, Request } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ReviewService {

  private readonly logger = new Logger(ReviewService.name)
  constructor(private prisma: PrismaService) { }

  async create(createReviewDto: CreateReviewDto) {
    const review = await this.prisma.review.create({
      data: createReviewDto
    })
    this.logger.log(`Review was created successfully, ${review}`);
    return review;
  }

  // find all the reviews for the provider id
  async findAll(providerId: number) {
    const review = await this.prisma.review.findMany({
      where: {
        providerProfileId: providerId,
      }
    })
  }

  // find all the reviews by me
  async findAllByMe(req: Request) {
    const review = await this.prisma.review.findMany({
      where: {
        // get the userid from the request object
        userId: req.user.id,
      }
    })
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findFirst({
      where: {
        id
      }
    })
    this.logger.log(`Review with id: ${id}: ${review}`)
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, req: Request) {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
      }
    })

    if (!review) {
      throw new NotFoundException(`Review not found!`);
    }

    if (review.userId !== req.user.id) {
      throw new ForbiddenException('You are not allowed to update this review')
    }
    const updatedReview = await this.prisma.review.update({
      where: {
        id,
      },
      data: updateReviewDto
    })
    this.logger.log(`Review with the review id ${id} has been updated!, ${updatedReview}`);
    return updatedReview;
  }

  async remove(id: string, req: Request) {
    // First, find the review
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== req.user.id) {
      throw new ForbiddenException('You are not allowed to delete this review');
    }

    // Now delete it
    const deletedReview = await this.prisma.review.delete({
      where: { id },
    });

    this.logger.log(`Review with id ${id} has been deleted!`);
    return deletedReview;
  }

}
