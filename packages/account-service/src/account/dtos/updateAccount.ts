import { IsNotEmpty } from 'class-validator';
import { AccountDto } from './account';

export class UpdateAccountDto extends AccountDto {
  @IsNotEmpty()
  id: number;
}
