import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-fechar-pedido',
  templateUrl: './fechar-pedido.component.html',
  styleUrls: ['./fechar-pedido.component.css']
})
export class FecharPedidoComponent implements OnInit {
  pedidoId!: number;
  errorMessage: string | null = null; 

  constructor(
    private pedidosService: PedidosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pedidoId = +this.route.snapshot.paramMap.get('id')!;
  }

  fecharPedido(): void {

      this.pedidosService.fecharPedido(this.pedidoId)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Erro ao fechar o pedido. Tente novamente mais tarde.';
          console.error('Erro ao fechar o pedido:', error);
          return of(null); 
        })
      )
      .subscribe(() => {
        this.router.navigate(['/pedidos']);
      });
    
  }
}
