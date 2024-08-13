import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido } from '../../models/pedido.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class ListarPedidosComponent implements OnInit {
  pedidos$: Observable<Pedido[]> = new Observable<Pedido[]>(); 
  private unsubscribe$ = new Subject<void>();

  constructor(
    private pedidosService: PedidosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.pedidos$ = this.pedidosService.listarPedidos();
  }

  iniciarPedido(): void {
    this.pedidosService.iniciarPedido().pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.ngOnInit();
      this.resetFilter();
      this.router.navigate(['/listar-pedidos']);
    });
  }
  
  private resetFilter(): void {
    const selectElement = document.getElementById('statusFilter') as HTMLSelectElement;
    selectElement.value = 'todos';
  }

  onStatusChange(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    if (status === 'todos') {
      this.carregarPedidos();
    } else {
      const fechado = status === 'fechado';
      this.pedidos$ = this.pedidosService.listarPedidosPorStatus(fechado);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  adicionarProduto(pedidoId: number): void {
    this.router.navigate(['/adicionar-produto', pedidoId]);
  }

  removerProduto(pedidoId: number, produtoId: number): void {
    this.router.navigate(['/remover-produto', pedidoId, produtoId]);
  }

  fecharPedido(pedidoId: number): void {
    this.router.navigate(['/fechar-pedido', pedidoId]);
  }
}
