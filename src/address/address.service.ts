import { User } from '@prisma/client';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { AddressValidation } from './address.validation';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AddressResponse, CreateAddressRequest } from '../model/address.model';

@Injectable()
export class AddressService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async create(
    user: User,
    request: CreateAddressRequest,
  ): Promise<AddressResponse> {
    const createRequest: CreateAddressRequest = this.validationService.validate(
      AddressValidation.CREATE,
      request,
    );

    const checkContactExist = await this.prismaService.contact.findUnique({
      where: {
        username: user.username,
        id: createRequest.contact_id,
      },
    });

    if (!checkContactExist) {
      throw new HttpException('Contact not found', 404);
    }

    const address = await this.prismaService.address.create({
      data: {
        ...createRequest,
      },
    });

    return {
      ...address,
    };
  }
}
