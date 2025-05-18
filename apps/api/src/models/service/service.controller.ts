import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request, BadRequestException } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { UserRole } from '@marketplace/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/role.decorator';
import { RoleGuard } from 'src/roles/role.guard';
import { GetProviderServicesDto } from './dto/get-provider-services.dto';

@Controller('service')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  @Roles(UserRole.PROVIDER)
  create(@Request() req: Request, @Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto, req);
  }

  @Get()
  getAllServices() {
    return this.serviceService.getAllServices();
  }

  @Get('me')
  @Roles(UserRole.PROVIDER)
  getMyServices(@Req() req: Request) {
    return this.serviceService.getMyServices(req);
  }

  @Get(':serviceId')
  findOne(@Param('serviceId') serviceId: string) {
    const id = parseInt(serviceId, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid service ID');
    }
    return this.serviceService.findOne(id);
  }

  @Roles(UserRole.PROVIDER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    const serviceId = parseInt(id, 10);
    if (isNaN(serviceId)) {
      throw new BadRequestException('Invalid service ID');
    }
    return this.serviceService.update(serviceId, updateServiceDto);
  }

  @Roles(UserRole.ADMIN, UserRole.PROVIDER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const serviceId = parseInt(id, 10);
    if (isNaN(serviceId)) {
      throw new BadRequestException('Invalid service ID');
    }
    return this.serviceService.remove(serviceId);
  }

  @Post(':id')
  @Roles(UserRole.PROVIDER)
  updateService(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    const serviceId = parseInt(id, 10);
    if (isNaN(serviceId)) {
      throw new BadRequestException('Invalid service ID');
    }
    return this.serviceService.update(serviceId, updateServiceDto);
  }
}
