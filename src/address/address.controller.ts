import { User } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';
import { AuthDecorator } from 'src/common/auth.decorator';
import { AddressService } from './address.service';
import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AddressResponse, CreateAddressRequest } from 'src/model/address.model';

@Controller('/api/contacts/:contactId/address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  // Create a new address
  @Post()
  @HttpCode(201)
  async create(
    @AuthDecorator() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() request: CreateAddressRequest,
  ): Promise<WebResponse<AddressResponse>> {
    request.contact_id = contactId;
    const result = await this.addressService.create(user, request);
    return {
      status: true,
      message: 'Address created successfully',
      data: result,
    };
  }
}
