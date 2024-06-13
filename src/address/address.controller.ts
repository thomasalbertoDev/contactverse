import { User } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';
import { AuthDecorator } from 'src/common/auth.decorator';
import { AddressService } from './address.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  AddressResponse,
  CreateAddressRequest,
  DeleteAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
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

  // Update an address
  @Put('/:addressId')
  @HttpCode(200)
  async update(
    @AuthDecorator() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() request: UpdateAddressRequest,
  ): Promise<WebResponse<AddressResponse>> {
    request.contact_id = contactId;
    request.id = addressId;
    const result = await this.addressService.update(user, request);
    return {
      status: true,
      message: 'Address updated successfully',
      data: result,
    };
  }

  // Delete an address
  @Delete('/:addressId')
  @HttpCode(200)
  async delete(
    @AuthDecorator() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<WebResponse<AddressResponse>> {
    const request: DeleteAddressRequest = {
      contact_id: contactId,
      address_id: addressId,
    };
    await this.addressService.delete(user, request);
    return {
      status: true,
      message: 'Address deleted successfully',
    };
  }
}
