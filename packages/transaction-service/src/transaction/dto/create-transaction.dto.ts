import {
  IsDecimal,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  accountId: number;

  @IsNumber()
  value: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  date: string;

  @IsArray()
  @IsOptional()
  tags: string[];
}
