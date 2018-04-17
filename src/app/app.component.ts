import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: String = "HomePage";

  pages: Array<{title: string, component: String}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public authService: AuthService) {
    this.initializeApp();

    this.pages = [
      { title: "Profile", component: "ProfilePage" },
      { title: "Categorias", component: "CategoriasPage" },
      { title: "Carrinho", component: "CartPage" },
      { title: "Logout", component: ""}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title: String, component: String}) {
    switch  (page.title){
      case "Logout":
      this.authService.logout();
      this.nav.setRoot("HomePage");
      break;

      default:
      this.nav.setRoot(page.component);
    }
    
  }
}
