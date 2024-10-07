import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


//eSTE ES EL dto que nos permite controlar el tipo de dato que recibimos mediante el request.En laravel seria un customRequest.
export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number;

}