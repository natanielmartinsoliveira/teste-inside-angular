import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Pedido as PedidoModel, Produto as ProdutoModel } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) { }

  listarPedidos(): Observable<PedidoModel[]> {
    return this.http.get<PedidoModel[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  iniciarPedido(): Observable<PedidoModel> {
    return this.http.post<PedidoModel>(this.apiUrl, {}).pipe(
      catchError(this.handleError)
    );
  }

  listarPedidosPorStatus(fechado: boolean): Observable<PedidoModel[]> {
    return this.http.get<PedidoModel[]>(`${this.apiUrl}/status/${fechado}`).pipe(
      catchError(this.handleError)
    );
  }

  adicionarProduto(pedidoId: number, produto: ProdutoModel): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${pedidoId}/produtos`, produto).pipe(
      catchError(this.handleError)
    );
  }

  removerProduto(pedidoId: number, produtoId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${pedidoId}/produtos/${produtoId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  fecharPedido(pedidoId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${pedidoId}/fechar`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
