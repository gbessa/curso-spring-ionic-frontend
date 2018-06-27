import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    let loading = this.presentLoadingDefault();
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      this.items = response['content'];
      this.loadImageUrls();
      loading.dismiss();
    },
    error => {
      loading.dismiss();
    });    
  }

  loadImageUrls() {
    this.items.map(produto => {
      this.produtoService.getSmallImageFromBucket(produto.id)
      .subscribe(response => {
        produto.imageUrl = `${API_CONFIG.bucketBaseURL}/prod${produto.id}-small.jpg`
      },
      error => {});
    })
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', {
      produto_id: produto_id
    })
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();
    return loading;
  }

}
