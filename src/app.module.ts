import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [CommonModule, UserModule, ContactModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
