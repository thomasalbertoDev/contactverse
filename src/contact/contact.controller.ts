import { User } from '@prisma/client';
import { WebResponse } from '../model/web.model';
import { AuthDecorator } from '../common/auth.decorator';
import { ContactService } from './contact.service';
import {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
} from '../model/contact.model';
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

@Controller('/api/contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  // Create Contact
  @Post()
  @HttpCode(201)
  async create(
    @AuthDecorator() user: User,
    @Body() request: CreateContactRequest,
  ): Promise<WebResponse<ContactResponse>> {
    const result = await this.contactService.create(user, request);
    return {
      status: true,
      message: 'Contact created successfully',
      data: result,
    };
  }

  // Get All Contacts
  @Get('/all')
  @HttpCode(200)
  async getAll(
    @AuthDecorator() user: User,
  ): Promise<WebResponse<ContactResponse[]>> {
    const result = await this.contactService.getAll(user);
    return {
      status: true,
      message: 'Contacts fetched successfully',
      data: result,
    };
  }

  // Get Contact By ID
  @Get('/:contactId')
  @HttpCode(200)
  async getById(
    @AuthDecorator() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebResponse<ContactResponse>> {
    const result = await this.contactService.getById(user, contactId);
    return {
      status: true,
      message: 'Contact fetched by id successfully',
      data: result,
    };
  }

  // Update Contact
  @Put('/:contactId')
  @HttpCode(200)
  async update(
    @AuthDecorator() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() request: UpdateContactRequest,
  ): Promise<WebResponse<ContactResponse>> {
    const result = await this.contactService.update(user, contactId, request);
    return {
      status: true,
      message: 'Contact updated successfully',
      data: result,
    };
  }

  // Delete Contact
  @Delete('/:contactId')
  @HttpCode(200)
  async delete(
    @AuthDecorator() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebResponse<ContactResponse>> {
    await this.contactService.delete(user, contactId);
    return {
      status: true,
      message: 'Contact deleted successfully',
    };
  }
}
