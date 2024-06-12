import { User } from '@prisma/client';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ContactValidation } from './contact.validation';
import { ValidationService } from '../common/validation.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ContactResponse, CreateContactRequest } from '../model/contact.model';

@Injectable()
export class ContactService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Create Contact
  async create(
    user: User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(`ContactService.create(${JSON.stringify(request)})`);
    const contactRequest = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    );

    const contact = await this.prismaService.contact.create({
      data: {
        ...contactRequest,
        ...{ username: user.username },
      },
    });

    return {
      // id: contact.id,
      // first_name: contact.first_name,
      // last_name: contact.last_name,
      // email: contact.email,
      // phone: contact.phone,
      ...contact,
    };
  }

  // Get All Contacts
  async getAll(user: User): Promise<ContactResponse[]> {
    this.logger.debug(`ContactService.findAll()`);
    const contacts = await this.prismaService.contact.findMany({
      where: {
        username: user.username,
      },
    });

    return contacts.map((contact) => {
      return {
        ...contact,
      };
    });
  }

  // Get Contact By Id
  async getById(user: User, contactId: number): Promise<ContactResponse> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return {
      ...contact,
    };
  }

  // Update Contact
  async update(
    user: User,
    contactId: number,
    request: ContactResponse,
  ): Promise<ContactResponse> {
    this.logger.debug(`ContactService.update(${JSON.stringify(request)})`);
    const updateRequest = this.validationService.validate(
      ContactValidation.UPDATE,
      request,
    );

    let contact = await this.prismaService.contact.findFirst({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    contact = await this.prismaService.contact.update({
      where: {
        id: contactId,
        username: user.username,
      },
      data: {
        ...updateRequest,
      },
    });

    return {
      ...contact,
    };
  }

  // Delete Contact
  async delete(user: User, contactId: number): Promise<void> {
    this.logger.debug(`ContactService.delete(${contactId})`);

    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    await this.prismaService.contact.delete({
      where: {
        id: contactId,
      },
    });
  }
}
