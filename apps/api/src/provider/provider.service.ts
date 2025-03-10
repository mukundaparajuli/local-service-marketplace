import { Injectable } from '@nestjs/common';
import { CreateProviderProfileDto } from './dto/create-provider.dto';
import { UpdateProviderProfileDto } from './dto/update-provider.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserRole } from '@marketplace/types';

@Injectable()
export class ProviderService {
  constructor(
    private prisma = PrismaService
  ) { }

  create(createProviderDto: CreateProviderProfileDto) {
    return 'This action adds a new provider';
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

  updateRole(id: number) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        role: UserRole.PROVIDER
      }
    })
  }
}
