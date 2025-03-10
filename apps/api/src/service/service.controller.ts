import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { RoleGuard } from 'src/role.guard';
import { Roles } from 'src/role.decorator';
import { UserRole } from '@marketplace/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('service')
@UseGuards(JwtAuthGuard)
@UseGuards(RoleGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  @Roles(UserRole.CUSTOMER)
  create(@Body() createServiceDto: CreateServiceDto, @Req() req: Request) {
    console.log("req.user", req.user)
    return this.serviceService.create(createServiceDto, req);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
