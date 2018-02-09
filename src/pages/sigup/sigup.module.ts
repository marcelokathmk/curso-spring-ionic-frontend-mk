import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigupPage } from './sigup';

@NgModule({
  declarations: [
    SigupPage,
  ],
  imports: [
    IonicPageModule.forChild(SigupPage),
  ],
})
export class SigupPageModule {}
