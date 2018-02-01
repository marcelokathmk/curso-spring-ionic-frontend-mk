import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  public login(){
    this.navCtrl.setRoot("CategoriasPage");  
  }

  public ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  public ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }
}
