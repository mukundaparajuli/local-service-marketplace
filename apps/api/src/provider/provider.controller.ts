import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderProfileDto } from './dto/create-provider.dto';
import { UpdateProviderProfileDto } from './dto/update-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) { }

  @Post(':id')
  create(@Body() createProviderDto: CreateProviderProfileDto, @Param('id') id: string) {
    return this.providerService.create(createProviderDto, +id);
  }

  @Get()
  findAll() {
    return this.providerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderProfileDto) {
    return this.providerService.update(+id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providerService.remove(+id);
  }
}
