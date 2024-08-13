import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarProdutoComponent } from './components/adicionar-produto/adicionar-produto.component';
import { RemoverProdutoComponent } from './components/remover-produto/remover-produto.component';
import { FecharPedidoComponent } from './components/fechar-pedido/fechar-pedido.component';
import { ListarPedidosComponent } from './components/listar-pedidos/listar-pedidos.component';

const routes: Routes = [
  { path: 'listar-pedidos', component: ListarPedidosComponent },
  { path: 'adicionar-produto/:id', component: AdicionarProdutoComponent },
  { path: 'remover-produto/:id/:produtoId', component: RemoverProdutoComponent },
  { path: 'fechar-pedido/:id', component: FecharPedidoComponent },
  { path: '', redirectTo: '/listar-pedidos', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/listar-pedidos', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
