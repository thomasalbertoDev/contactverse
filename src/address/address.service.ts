import { User } from '@prisma/client';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { AddressValidation } from './address.validation';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
} from '../model/address.model';

@Injectable()
export class AddressService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Create address
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

  // Get address
  async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const getRequest: GetAddressRequest = this.validationService.validate(
      AddressValidation.GET,
      request,
    );
    const checkContactExist = await this.prismaService.contact.findUnique({
      where: {
        username: user.username,
        id: getRequest.contact_id,
      },
    });

    if (!checkContactExist) {
      throw new HttpException('Contact not found', 404);
    }

    const address = await this.prismaService.address.findUnique({
      where: {
        id: getRequest.address_id,
        contact_id: getRequest.contact_id,
      },
    });

    if (!address) {
      throw new HttpException('Address not found', 404);
    }

    return {
      ...address,
    };
  }

  // Update address
  async update(
    user: User,
    request: UpdateAddressRequest,
  ): Promise<AddressResponse> {
    const updateRequest: UpdateAddressRequest = this.validationService.validate(
      AddressValidation.UPDATE,
      request,
    );

    const checkContactExist = await this.prismaService.contact.findUnique({
      where: {
        username: user.username,
        id: updateRequest.contact_id,
      },
    });

    if (!checkContactExist) {
      throw new HttpException('Contact not found', 404);
    }

    const address = await this.prismaService.address.findUnique({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id,
      },
    });

    if (!address) {
      throw new HttpException('Address not found', 404);
    }

    const updateAddress = await this.prismaService.address.update({
      where: {
        id: address.id,
        contact_id: address.contact_id,
      },
      data: {
        ...updateRequest,
      },
    });

    return {
      ...updateAddress,
    };
  }
}
