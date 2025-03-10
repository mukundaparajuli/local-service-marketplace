import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderProfileDto } from './create-provider.dto';

export class UpdateProviderProfileDto extends PartialType(CreateProviderProfileDto) { }
