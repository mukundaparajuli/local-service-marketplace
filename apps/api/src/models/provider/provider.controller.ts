import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderProfileDto } from './dto/create-provider.dto';
import { UpdateProviderProfileDto } from './dto/update-provider.dto';
import { ProviderProfile, UserRole } from '@marketplace/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/role.decorator';

// @UseGuards(JwtAuthGuard, RoleGuard)
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) { }

  @Roles(UserRole.ADMIN)
  @Post('id')
  create(@Param('id', ParseIntPipe) id: number, @Body() createProviderDto: CreateProviderProfileDto) {
    return this.providerService.create(createProviderDto, +id);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll(): Promise<ProviderProfile[]> {
    return this.providerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.findOne(id);
  }

  @Roles(UserRole.PROVIDER, UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProviderDto: UpdateProviderProfileDto
  ): Promise<ProviderProfile> {
    return this.providerService.update(id, updateProviderDto);
  }

  @Roles(UserRole.ADMIN, UserRole.PROVIDER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.remove(id);
  }
}
