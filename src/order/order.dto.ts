import { IsNumber, IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsDate()
  order_time: Date;
}
