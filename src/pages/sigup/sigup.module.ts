import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigupPage } from './sigup';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';

@NgModule({
  declarations: [
    SigupPage,
  ],
  imports: [
    IonicPageModule.forChild(SigupPage),
  ],
  providers:[
    CidadeService,
    EstadoService
  ]
})
export class SigupPageModule {}
