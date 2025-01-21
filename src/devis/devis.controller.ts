import { Body, Controller, Post } from '@nestjs/common';
import { DevisService } from './devis.service';
import { DevisDto } from './dto/devis.dto';

@Controller('devis')
export class DevisController {
    constructor(
        private devisService :DevisService
    ){}

    @Post("/created")
    create(@Body() devis:DevisDto){
        return this.devisService.create(devis)
    }
}
