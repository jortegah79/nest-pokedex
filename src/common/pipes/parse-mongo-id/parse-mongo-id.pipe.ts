import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';


//es un inyectable para poder inyectarlo como servicio haya donde los necesitemos. ES un Pipe personalizado.
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    
    //Si no es un un MongoId valido ( isValidObjectId controla eso.)
    if(!isValidObjectId( value )){
      throw new BadRequestException('EL id no es un MongoId correcto.');
    }   
    return value;
  }
}
