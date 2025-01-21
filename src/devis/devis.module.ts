import { Module } from '@nestjs/common';
import { DevisController } from './devis.controller';
import { DevisService } from './devis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Devis, deviSchema } from 'src/models/Devis.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Devis.name,
        schema:deviSchema
      }
    ])
  ],
  controllers: [DevisController],
  providers: [DevisService]
})
export class DevisModule {}
