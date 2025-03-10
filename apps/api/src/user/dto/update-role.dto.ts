import { UserRole } from "@marketplace/types";
import { Type } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";
import { CreateProviderProfileDto } from "src/provider/dto/create-provider.dto";

export class UpdateRoleDto {
    @IsEnum(UserRole)
    role!: UserRole

    @IsOptional()
    @Type(() => CreateProviderProfileDto)
    providerProfile?: CreateProviderProfileDto
}