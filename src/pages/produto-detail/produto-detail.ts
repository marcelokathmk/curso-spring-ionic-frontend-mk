import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public produtoService: ProdutoService,
      public cartService: CartService) {
  }

  public ionViewDidLoad() {
      let produtoId = this.navParams.get("produtoId")
      this.produtoService.findById(produtoId).subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      }, error => {});
  }

  public getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucket_base_url}/prod${this.item.id}.jpg`;
    }, error => {});
  }

  public addToCart(produto: ProdutoDTO){
    this.cartService.addProduct(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
