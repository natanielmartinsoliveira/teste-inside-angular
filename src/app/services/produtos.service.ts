import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pedido, Produto as ProdutoModel } from '../models/pedido.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiUrl = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) { }

  listarProdutos(): Observable<ProdutoModel[]> {
    return this.http.get<ProdutoModel[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  adicionarProduto(produto: ProdutoModel): Observable<ProdutoModel> {
    return this.http.post<ProdutoModel>(this.apiUrl, produto).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
