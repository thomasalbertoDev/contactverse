import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  providers: [AddressService],
  imports: [ContactModule],
  controllers: [AddressController],
})
export class AddressModule {}
