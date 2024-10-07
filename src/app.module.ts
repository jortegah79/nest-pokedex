import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      
      //este sirve para leer la configuracion
      load:[EnvConfiguration],
      //este sirve para validar el environment
      validationSchema:JoiValidationSchema

    }),
    PokemonModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),    
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    SeedModule,
  ],
})
export class AppModule { }
