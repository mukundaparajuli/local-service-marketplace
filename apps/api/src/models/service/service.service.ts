import { Injectable, Logger, Request } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PricingType, Service } from '@marketplace/types';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { $Enums } from '@prisma/client';
import { GetProviderServicesDto } from './dto/get-provider-services.dto';

@Injectable()
export class ServiceService {
  private readonly logger = new Logger(ServiceService.name)
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

  async findAll(getProviderServicesDto: GetProviderServicesDto) {
    const services = await this.prisma.serviceOffering.findMany({
      where: {
        providerProfileId: getProviderServicesDto.providerId
      }
    })
    this.logger.log("services fetched successfully", services)
    return {
      services
    }
  }

  async findOne(serviceId: number) {
    this.logger.debug(serviceId);
    const service = await this.prisma.serviceOffering.findUnique({
      where: {
        id: serviceId
      }
    })
    this.logger.log(`Fetched the service from the database successfully: ${service}`);
    return {
      service
    }
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

  async remove(id: number) {

    // T0D0: Check if the service was added by the particular provider
    const deletedService = await this.prisma.serviceOffering.delete({
      where: {
        id
      }
    })

    this.logger.log(`this service ${deletedService} has been deleted!`);
    return {};
  }
}
