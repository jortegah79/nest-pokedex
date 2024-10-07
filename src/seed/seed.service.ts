import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name) readonly pokemonModel: Model<Pokemon>,
    private readonly httpAdapter:AxiosAdapter
) { }

  async executeSeed() {
   // const insertPromisesArray = [];
   const pokemonToInsert:{name:string,no:number}[]=[];

    await this.pokemonModel.deleteMany({});
    const data = await this.httpAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const no = parseInt(segments[segments.length - 2]);

      // insertPromisesArray.push(_
      //   this.pokemonModel.create({ name, no })
      // );
      // Promise.all(insertPromisesArray);
      pokemonToInsert.push({name,no});      
    })
    this.pokemonModel.insertMany(pokemonToInsert);
    return data.results;
  }


}
