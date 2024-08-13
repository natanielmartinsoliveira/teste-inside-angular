import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-remover-produto',
  templateUrl: './remover-produto.component.html',
  styleUrls: ['./remover-produto.component.css']
})
export class RemoverProdutoComponent implements OnInit {
  pedidoId!: number;
  produtoId!: number;
  errorMessage: string | null = null; 

  constructor(
    private pedidosService: PedidosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pedidoId = +this.route.snapshot.paramMap.get('id')!;
    this.produtoId = +this.route.snapshot.paramMap.get('produtoId')!;
  }

  removerProduto(): void {
      this.pedidosService.removerProduto(this.pedidoId, this.produtoId)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Erro ao remover o produto. Tente novamente mais tarde.';
          console.error('Erro ao remover o produto:', error);
          return of(null); // Retorna um Observable vazio
        })
      )
      .subscribe(() => {
        this.router.navigate(['/pedidos']);
      });
}
}
