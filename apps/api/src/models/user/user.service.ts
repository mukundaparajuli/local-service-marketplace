import { Injectable, Logger, NotFoundException, Request } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { $Enums, Prisma } from '@prisma/client';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ProviderService } from 'src/models/provider/provider.service';
import { ProviderProfile, UserRole } from '@marketplace/types';
import { CreateProviderProfileDto } from 'src/models/provider/dto/create-provider.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(
    private prisma: PrismaService,
    private providerProfile: ProviderService
  ) { }

  async findAll(req: Request) {
    console.log(req.user);
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found!`);
    }
    return user;
  }

  async updateOne(id: number, updatedData: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updatedData,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });
      return deletedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async updateUserRole(data: UpdateRoleDto, id: number): Promise<ProviderProfile> {
    let createdProviderProfile: ProviderProfile;
    console.log("data=", data);
    const { role, providerProfile } = data as { role: UserRole, providerProfile?: CreateProviderProfileDto };

    const user = await this.prisma.user.findFirst({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException("User Not Found!");
    }

    // Wrap transaction in a return statement
    return await this.prisma.$transaction(async (prisma) => {
      const existingUser = await prisma.user.findUnique({ where: { id } });

      if (!existingUser) {
        throw new NotFoundException("User Not Found!");
      }

      await prisma.user.update({
        where: { id },
        data: { role: role as $Enums.UserRole },
      });

      if (role === UserRole.PROVIDER) {
        this.logger.log(role);
        // const existingProvider = await prisma.providerProfile.findFirst({ where: { userId: id } });

        // if (existingProvider) {
        // throw new NotFoundException('Provider profile already exists for this user');
        // }

        if (!providerProfile) {
          createdProviderProfile = await prisma.providerProfile.create({
            data: {
              businessName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
              description: `Profile for ${user.username}`,
              address: undefined,
              city: 'Unknown',
              state: 'Unknown',
              zipCode: undefined,
              latitude: undefined,
              longitude: undefined,
              operatingHours: undefined,
              serviceRadius: undefined,
              acceptsHomeVisits: false,
              hasPhysicalStore: false,
              isBlocked: false,
              averageRating: 0,
              totalReviews: 0,
              contactInfo: user.phoneNumber
                ? JSON.parse(`{"phone": "${user.phoneNumber}"}`)
                : undefined,
              user: { connect: { id } },
            },
          });
        } else {
          createdProviderProfile = await this.providerProfile.create(providerProfile, id);
        }
      }

      return createdProviderProfile;
    });
  }
}