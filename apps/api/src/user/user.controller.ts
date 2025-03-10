import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    return this.userService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updatedData: UpdateUserDto) {
    return this.userService.updateOne(+id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id/role')
  updateUserRole(@Param('id') id: string, data: UpdateRoleDto) {
    return this.userService.updateUserRole(+id, data)
  }
}
