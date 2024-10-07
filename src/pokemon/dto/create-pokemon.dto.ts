import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

//controla como deben ser los datos que nos entran por la query
export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)  
    no:number;

    @IsString()
    @MinLength(1)
    name:string;

}

