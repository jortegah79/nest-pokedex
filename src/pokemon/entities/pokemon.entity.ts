import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


//este es el esquema que sirve para trabajar con la base de datos Mongo.@Schema indica que es un documento.Por ello extendemos nuestra clase
//con la clase Document.
@Schema()
export class Pokemon extends Document {

    //Esta es una prop..iedad y en el objeto indicamos que se puede indexar por esta propiedad y que es unica.
    //Tambien indicamos el nombre de la pripiedad y el tipo. Si puede ser opcional, lo indicamos con un ?
    @Prop({
        index: true,
        unique: true
    })
    name: string;

    @Prop({
        index: true,
        unique: true 
    })
    no: number;
}

//Por ultimo lo exportamos generando un Schema con SchemaFactory.
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
