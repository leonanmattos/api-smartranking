import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayerDTO {
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;
  @IsNotEmpty({ message: 'Phone Number is required' })
  readonly phoneNumber: string;
  @IsEmail({}, { message: 'E-mail invalid' })
  @IsNotEmpty({ message: 'E-mail is required ' })
  readonly email: string;
}
