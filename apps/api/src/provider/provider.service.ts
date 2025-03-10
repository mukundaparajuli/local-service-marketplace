import { Injectable } from '@nestjs/common';
import { CreateProviderProfileDto } from './dto/create-provider.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateProviderProfileDto } from './dto/update-provider.dto';
import { ProviderProfile } from '@marketplace/types';

@Injectable()
export class ProviderService {
  constructor(
    private prisma: PrismaService
  ) { }

  // we might get the data to create provider profile directly from the controller or by the user.service when the user role is changed to provider
  async create(data: CreateProviderProfileDto, id: number): Promise<ProviderProfile> {
    return await this.prisma.providerProfile.create({
      data: {
        ...data as CreateProviderProfileDto,
        userId: id
      }
    });
  }

  findAll() {
    return `This action returns all provider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  update(id: number, updateProviderDto: UpdateProviderProfileDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }

}
