

//ESta es la interfaz adaptadora que todos las clases que vayamos a usar para acceder a datos deberán implementar junto con el metodo 
//Permite indicar que se obtendrá elementos de tipo T y una promesa de tipo T
export interface HttpAdapter{
    get<T>( url:string):Promise<T>;
}