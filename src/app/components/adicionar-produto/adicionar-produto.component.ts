import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido, Produto as ProdutoModel } from '../../models/pedido.model';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent {
  pedidoId: number;
  produto: ProdutoModel = { id: 0, nome: '', descricao: '', preco: 0 };

  constructor(
    private pedidosService: PedidosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pedidoId = +this.route.snapshot.paramMap.get('id')!;
  }

  adicionarProduto(): void {
    this.pedidosService.adicionarProduto(this.pedidoId, this.produto).subscribe(() => {
      this.router.navigate(['/pedidos']);
    });
  }
}
