import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingControl: LoadingController) {

  }

  public ionViewDidLoad() {
      let catId = this.navParams.get("categoria");
      let loader = this.presentLoading();

      this.produtoService.findByCategoria(catId).subscribe(response => {
          this.items = response["content"];
          this.loadImageUrls();
          loader.dismiss();
      },
      error => {
        loader.dismiss();
      });
  }

  public loadImageUrls(){
    for (let i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        this.produtoService.getSmallImageFromBucket(item.id).subscribe(response => {
            item.imageUrl = `${API_CONFIG.bucket_base_url}/prod${item.id}-small.jpg`;
        },
         error => {});
      
    }
  }

  public showDetail(produtoId: String){
    this.navCtrl.push("ProdutoDetailPage", {produtoId: produtoId});
  }

  public presentLoading() {
    let loader = this.loadingControl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}
