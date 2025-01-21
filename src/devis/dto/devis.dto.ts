import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DevisDto {
  @IsNotEmpty()
  @IsNumber()
  num_devis: number;

  @IsNotEmpty()
  @IsString()
  Nom: string;

  @IsNotEmpty()
  @IsString()
  prestation: string;

  @IsNotEmpty()
  @IsDate()
  date_debut: Date;

  @IsNotEmpty()
  @IsNumber()
  durre: number;

  @IsNotEmpty()
  @IsString()
  lieux: string;

  @IsNotEmpty()
  @IsArray()
  descriptions: Array<object>[];

  @IsNotEmpty()
  @IsNumber()
  prix: number;

  @IsNotEmpty()
  @IsString()
  paiment: string;

  @IsNotEmpty()
  @IsString()
  condition: string;
}
