import { User } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';
import { AuthDecorator } from 'src/common/auth.decorator';
import { AddressService } from './address.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
} from 'src/model/address.model';

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

  // Get an address
  @Get('/:addressId')
  @HttpCode(201)
  async get(
    @AuthDecorator() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<WebResponse<AddressResponse>> {
    const request: GetAddressRequest = {
      contact_id: contactId,
      address_id: addressId,
    };

    const result = await this.addressService.get(user, request);
    return {
      status: true,
      message: 'Address Get successfully',
      data: result,
    };
  }
}