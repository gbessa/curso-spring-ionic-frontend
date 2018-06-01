import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Thumbnail } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartItem } from '../../models/cart-item';
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

  ionViewDidLoad() {
    this.produtoService.findById(this.navParams.get('produto_id'))
    .subscribe(response => {
      this.item = response;
      this.getImageUrlIfExists();
    },
    error => {})
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
    .subscribe(response => {
      let url = `${API_CONFIG.bucketBaseURL}/prod${this.item.id}.jpg`;
      this.item.imageUrl = url
    },
    error => {})
  }

  addToCartItem(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }
  
}
