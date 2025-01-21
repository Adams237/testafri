import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DevisModule } from './devis/devis.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://adams:adams@cluster0.vhrl4rs.mongodb.net/testAfri?retryWrites=true&w=majority'),
    DevisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
