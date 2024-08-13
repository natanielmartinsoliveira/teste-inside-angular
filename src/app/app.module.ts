import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListarPedidosComponent } from './components/listar-pedidos/listar-pedidos.component';
import { AdicionarProdutoComponent } from './components/adicionar-produto/adicionar-produto.component';
import { RemoverProdutoComponent } from './components/remover-produto/remover-produto.component';
import { FecharPedidoComponent } from './components/fechar-pedido/fechar-pedido.component';
import { PedidosService } from './services/pedidos.service';

@NgModule({
  declarations: [
    AppComponent,
    ListarPedidosComponent,
    AdicionarProdutoComponent,
    RemoverProdutoComponent,
    FecharPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PedidosService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
