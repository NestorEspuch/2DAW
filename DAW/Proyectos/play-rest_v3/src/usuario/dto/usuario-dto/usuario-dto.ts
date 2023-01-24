import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsuarioDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly login: string; //Minimo 5 caracteres, no admite duplicados
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string; //Minimo 8 caracteres, guardar encriptado (bcrypt)
}
