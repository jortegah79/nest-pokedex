import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { Axios } from 'axios';

//Es un provider porque nos provee de informacion y para usarlo fuera debemos exportarlo
@Module({
    providers: [
        AxiosAdapter
    ],
    exports: [
        AxiosAdapter
    ]
})
export class CommonModule { }
