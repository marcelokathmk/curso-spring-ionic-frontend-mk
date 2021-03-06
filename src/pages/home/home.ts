import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {

  }

  public login(){
    this.auth.authenticate(this.creds)
    .subscribe(
      response => {
        this.auth.sucessfullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("CategoriasPage");  
      },
      error => {});
  }

  public ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  public ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  public ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(
      response => {
        this.auth.sucessfullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("CategoriasPage");  
      },
      error => {});
  }

  public signUp(){
    this.navCtrl.push("SigupPage");
  }
}
