import { Injectable, Logger, Request } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PricingType, Service, UserRole } from '@marketplace/types';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetProviderServicesDto } from './dto/get-provider-services.dto';
import { Roles } from 'src/roles/role.decorator';

@Injectable()
export class ServiceService {
  private readonly logger = new Logger(ServiceService.name)
  constructor(
    private prisma: PrismaService
  ) { }

  async create(data: CreateServiceDto, req: Request): Promise<Service> {
    const user = req.user;

    console.log("user = ", user);
    console.log("data = ", data);

    const providerProfile = await this.prisma.providerProfile.findUnique({
      where: {
        userId: user?.id
      }
    })


    const createdService = await this.prisma.serviceOffering.create({
      data: {
        name: data.name,
        description: data.description ?? '',
        price: data.price,
        pricingType: data.pricingType as PricingType,
        duration: data.durationInMinutes ?? null,
        providerProfileId: providerProfile?.id
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
      },
      include: {
        providerProfile: {
          select: {
            id: true,
            businessName: true,
            address: true,
            contactInfo: true,
          }
        }
      }
    })

    if (!service) {
      throw new Error('Service not found');
    }

    this.logger.log(`Fetched the services`, service);
    return {
      service: {
        ...service,
        price: service.price.toNumber(),
        pricingType: service.pricingType as PricingType,
        providerId: service.providerProfileId ?? 0,
      }
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
    const deletedService = await this.prisma.serviceOffering.delete({
      where: {
        id
      }
    })

    this.logger.log(`this service ${deletedService} has been deleted!`);
    return {};
  }

  async getAllServices() {
    const services = await this.prisma.serviceOffering.findMany({
      include: {
        providerProfile: {
          select: {
            id: true,
            businessName: true,
            address: true,
            contactInfo: true,
          }
        }
      }
    })
    this.logger.log("services fetched successfully", services)
    return {
      services
    }
  }

  @Roles(UserRole.PROVIDER)
  async getMyServices(req: Request) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: req.user?.id
      },
      include: {
        profile: true
      }
    })

    if (!user || !user.profile) {
      throw new Error("Provider profile not found");
    }

    const services = await this.prisma.serviceOffering.findMany({
      where: {
        providerProfileId: user.profile.id
      },
      include: {
        providerProfile: {
          select: {
            id: true,
            businessName: true,
            address: true,
            contactInfo: true,
          }
        }
      }
    })

    console.log("user = ", user);

    if (!user) {
      throw new Error("User not found");
    }

    console.log("services = ", services);
    return services;
  }
}
