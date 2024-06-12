import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AuthDecorator } from '../common/auth.decorator';
import { User } from '@prisma/client';
import { ContactResponse, CreateContactRequest } from '../model/contact.model';
import { WebResponse } from '../model/web.model';

@Controller('/api/contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

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
}
