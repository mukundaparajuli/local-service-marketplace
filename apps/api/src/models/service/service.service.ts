import { Injectable, Request } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PricingType, Service } from '@marketplace/types';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(data: CreateServiceDto, req: Request): Promise<Service> {
    const user = req.user;

    console.log("user = ", user);
    const createdService = await this.prisma.serviceOffering.create({
      data: {
        name: data.name,
        description: data.description ?? '',
        price: data.price,
        pricingType: data.pricingType as $Enums.PricingType,
        duration: data.durationInMinutes ?? null,
        providerProfileId: user.id
      }
    })
    console.log("service= ", createdService);
    return {
      ...createdService,
      price: createdService.price.toNumber(),
      pricingType: createdService.pricingType as PricingType,
      providerId: createdService.providerProfileId ?? 0,
    };
  }

  findAll() {
    return `This action returns all service`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
    try {
      const updatedService = await this.prisma.serviceOffering.update({
        where: {
          id,
        },
        data: updateServiceDto
      });
      return {
        ...updatedService,
        price: updatedService.price.toNumber(),
        pricingType: updatedService.pricingType as PricingType,
        providerId: updatedService.providerProfileId ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
