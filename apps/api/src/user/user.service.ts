import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { $Enums, Prisma } from '@prisma/client';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ProviderService } from 'src/provider/provider.service';
import { ProviderProfile, UserRole } from '@marketplace/types';
import { CreateProviderProfileDto } from 'src/provider/dto/create-provider.dto';

@Injectable()
export class UserService {
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

  async updateUserRole(id: number, data: UpdateRoleDto) {
    const { role, providerProfile } = data as { role: UserRole, providerProfile?: ProviderProfile };

    // find user
    const user = await this.prisma.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new NotFoundException("User Not Found!")
    }

    // update the role and create a provider profile
    await this.prisma.$transaction(async (prisma) => {
      // update the role to provider
      const user = await prisma.user.findUnique({
        where: {
          id,
        }
      })

      if (!user) {
        throw new NotFoundException("User Not Found!")
      }

      const updatedUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          role: role as $Enums.UserRole
        }
      })

      console.log(updatedUser)

      // check if provider profile has been provided
      //  if provider profile has not been provided import data from the user
      if (role === UserRole.PROVIDER && !providerProfile) {
        const existingProvider = await prisma.providerProfile.findFirst({
          where: {
            userId: id,
          }
        })

        if (existingProvider) {
          throw new NotFoundException('Provider profile already exists for this user');
        }

        if (!providerProfile) {
          const createdProviderProfile = await prisma.providerProfile.create({
            data: {
              businessName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username, // Fallback to username
              description: `Profile for ${user.username}`, // Default description
              address: user.phoneNumber ? undefined : 'Not provided', // Optional, could be omitted
              city: 'Unknown',
              state: 'Unknown',
              zipCode: undefined,
              latitude: undefined,
              Longitude: undefined,
              operatingHours: undefined,
              serviceRadius: undefined,
              acceptsHomeVisist: false,
              hasPhysicalStore: false,
              isBlocked: false,
              averageRating: 0,
              totalReviews: 0,
              contactInfo: user.phoneNumber
                ? JSON.parse(`{"phone": "${user.phoneNumber}"}`)
                : undefined,
              userId: id,
            }
          })

          console.log("created provider profile", createdProviderProfile);
        } else {
          // if provider profile is provided
          // TODO: CREATE A PROVIDER PROFILE WITH THE PROVIDED PROVIDER PROFILE INFO
        }
      };
    })
  }
}