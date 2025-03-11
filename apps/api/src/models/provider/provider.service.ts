import { Injectable, Provider } from '@nestjs/common';
import { CreateProviderProfileDto } from './dto/create-provider.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateProviderProfileDto } from './dto/update-provider.dto';
import { ProviderProfile, UserRole } from '@marketplace/types';

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

  async findAll(): Promise<ProviderProfile[]> {
    try {
      const allProviders = await this.prisma.providerProfile.findMany()
      return allProviders;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const providerProfile = await this.prisma.providerProfile.findUnique({
        where: {
          id
        }
      })
      console.log(providerProfile);
      return providerProfile;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatedData: UpdateProviderProfileDto): Promise<ProviderProfile> {
    try {
      const updatedUser = await this.prisma.providerProfile.update({
        where: { id },
        data: updatedData,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    };
  }

  async remove(id: number) {
    try {
      const deletedProvider = await this.prisma.providerProfile.delete({
        where: {
          id
        }
      })
      return deletedProvider;
    } catch (error) {
      throw error;
    };
  }

}
