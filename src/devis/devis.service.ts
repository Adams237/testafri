import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Devis } from 'src/models/Devis.model';
import { DevisDto } from './dto/devis.dto';

@Injectable()
export class DevisService {
    constructor(
        @InjectModel(Devis.name) private readonly devisModel:Model<Devis>
    ){}

    async create(devis:DevisDto){
        try{
            const newDevis = new this.devisModel(devis)
            return await newDevis.save()
        }catch(error){
            if(error.respons)throw new HttpException(error.response,error.status)
            console.log(error)
            throw new HttpException("une erreur est survenue",500)
        }
    }
}
