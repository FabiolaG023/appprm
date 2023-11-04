import { Controller } from '@nestjs/common';
import { ComiteService } from './comite.service';
import { ComiteEntity } from './comite.entity';



@Controller('comite')
export class ComiteController {

  constructor(private service: ComiteService) { }

}
