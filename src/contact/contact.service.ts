import { User } from '@prisma/client';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ContactValidation } from './contact.validation';
import { ValidationService } from '../common/validation.service';
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
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
}
