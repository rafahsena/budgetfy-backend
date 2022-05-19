import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountService } from './account.service';
import { AccountDto } from './dtos/account';
import { UpdateAccountDto } from './dtos/updateAccount';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern('createAccount')
  create(@Payload() accountInfo: AccountDto) {
    return this.accountService.create(accountInfo);
  }

  @MessagePattern('findAllAccount')
  findAll() {
    return this.accountService.findAll();
  }

  @MessagePattern('findOneAccount')
  findOne(@Payload() id: number) {
    return this.accountService.findOne(id);
  }

  @MessagePattern('updateAccount')
  update(@Payload() { id, ...accountInfo }: UpdateAccountDto) {
    return this.accountService.update(id, accountInfo);
  }

  @MessagePattern('removeAccount')
  remove(@Payload() id: number) {
    return this.accountService.remove(id);
  }
}
