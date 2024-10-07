import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { config } from 'rxjs';

@Injectable()
export class PokemonService {

  private default_number:number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService:ConfigService) { 
      this.default_number=this.configService.get('default_limit');
      // console.log(process.env.DEFAULT_LIMIT);
      // console.log(configService.get<number>('default_limit'));
      

    }

  async create(createPokemonDto: CreatePokemonDto) {

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto) {
    const { limit = this.default_number, offset = 0 } = paginationDto;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v');
  }

  async findOne(term: string): Promise<Pokemon> {

    let pokemon: Pokemon;
    if (Number(term)) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term })
    }
    if (!pokemon) {
      throw new NotFoundException("No hay ningún pokemon con el término de busqueda: " + term);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name && pokemon.name !== updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()
    }
    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async remove(id: string) {

    //    await this.pokemonModel.findByIdAndDelete(id);

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    if (deletedCount === 0) {
      throw new BadRequestException("El mongoId recibido no es correcto");
    }
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Atencion! EL pokemon ya existe en la base de datos. ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`No ha sido posible crear el pokemon.Observa los logs...`);
  }
}
