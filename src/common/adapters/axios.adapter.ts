import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";


//Se indica injectable para mostrar que permitir la inyeccion de dependencias en el contructor donde lo necesitemos.
//Esta seria la implementacion de nuestro patron adaptador usando axios.Podriamos usar también fetch creando FetchAdapter y haría la misma funcion.
@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axiosAdapter: AxiosInstance = axios;
    
    async get<T>(url: string): Promise<T> {        
        try {

            const { data } = await this.axiosAdapter.get<T>(url);
            return data;

        } catch (error) {
            throw new Error('This is an error!');
        }
        return;
    }

}