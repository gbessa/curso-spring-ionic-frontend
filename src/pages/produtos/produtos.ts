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

  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  private loadData() {
    let categoria_id = this.navParams.get('categoria_id');
    let loading = this.presentLoadingDefault();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
    .subscribe(response => {
      let newItems = response['content'];
      this.loadImageUrls(newItems);
      this.items = this.items.concat(newItems);
      loading.dismiss();
    },
    error => {
      loading.dismiss();
    }); 
  }

  loadImageUrls(newItems) {
    newItems.map(produto => {
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

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }  

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }  

}
