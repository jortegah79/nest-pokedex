import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

//controla lo mismo que createPokemonDto, pero como es un update podria tener mas datos que create....no en este caso
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
