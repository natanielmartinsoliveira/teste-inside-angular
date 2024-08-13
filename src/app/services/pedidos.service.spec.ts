import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PedidosService } from './pedidos.service';
import { environment } from '../../environments/environment';
import { Pedido as PedidoModel, Produto as ProdutoModel } from '../models/pedido.model';

describe('PedidosService', () => {
  let service: PedidosService;
  let httpTestingController: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/pedidos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PedidosService]
    });

    service = TestBed.inject(PedidosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list pedidos', () => {
    const mockPedidos: PedidoModel[] = [
      { id: 1, produtos: [], fechado: false },
      { id: 2, produtos: [], fechado: true }
    ];

    service.listarPedidos().subscribe(pedidos => {
      expect(pedidos).toEqual(mockPedidos);
    });
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPedidos);
  });

  it('should handle errors when listing pedidos', () => {
    service.listarPedidos().subscribe(
      () => fail('should have failed with a 500 error'),
      (error: string) => expect(error).toContain('Something went wrong; please try again later.')
    );
    const req = httpTestingController.expectOne(apiUrl);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should start a new pedido', () => {
    const newPedido: PedidoModel = { id: 3, produtos: [], fechado: false };
    service.iniciarPedido().subscribe(pedido => {
      expect(pedido).toEqual(newPedido);
    });
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(newPedido);
  });

  it('should handle errors when starting a new pedido', () => {
    service.iniciarPedido().subscribe(
      () => fail('should have failed with a 500 error'),
      (error: string) => expect(error).toContain('Something went wrong; please try again later.')
    );
    const req = httpTestingController.expectOne(apiUrl);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should list pedidos by status', () => {
    const mockPedidos: PedidoModel[] = [
      { id: 1, produtos: [], fechado: true },
      { id: 2, produtos: [], fechado: true }
    ];
    service.listarPedidosPorStatus(true).subscribe(pedidos => {
      expect(pedidos).toEqual(mockPedidos);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/status/true`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPedidos);
  });

  it('should handle errors when listing pedidos by status', () => {
    service.listarPedidosPorStatus(true).subscribe(
      () => fail('should have failed with a 500 error'),
      (error: string) => expect(error).toContain('Something went wrong; please try again later.')
    );
    const req = httpTestingController.expectOne(`${apiUrl}/status/true`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should add a product to a pedido', () => {
    const produto: ProdutoModel = { id: 1, nome: 'Produto 1', descricao: 'Descricao 1', preco: 100 };
    service.adicionarProduto(1, produto).subscribe(() => {
    });
    const req = httpTestingController.expectOne(`${apiUrl}/1/produtos`);
    expect(req.request.method).toEqual('POST');
    req.flush(null);
  });

  it('should handle errors when adding a product', () => {
    const produto: ProdutoModel = { id: 1, nome: 'Produto 1', descricao: 'Descricao 1', preco: 100 };
    service.adicionarProduto(1, produto).subscribe(
      () => fail('should have failed with a 500 error'),
      (error: string) => expect(error).toContain('Something went wrong; please try again later.')
    );
    const req = httpTestingController.expectOne(`${apiUrl}/1/produtos`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should remove a product from a pedido', () => {
    service.removerProduto(1, 1).subscribe(() => {
    });
    const req = httpTestingController.expectOne(`${apiUrl}/1/produtos/1`);
    expect(req.request.method).toEqual('PATCH');
    req.flush(null);
  });

  it('should handle errors when removing a product', () => {
    service.removerProduto(1, 1).subscribe(
      () => fail('should have failed with a 500 error'),
      (error: string) => expect(error).toContain('Something went wrong; please try again later.')
    );

    const req = httpTestingController.expectOne(`${apiUrl}/1/produtos/1`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should close a pedido', () => {
    service.fecharPedido(1).subscribe(() => {
    });
    const req = httpTestingController.expectOne(`${apiUrl}/1/fechar`);
    expect(req.request.method).toEqual('PATCH');
    req.flush(null);
  });

  it('should handle errors when closing a pedido', () => {
    service.fecharPedido(1).subscribe(
      () => fail('should have failed with a 500 error'),
      (error: string) => expect(error).toContain('Something went wrong; please try again later.')
    );
    const req = httpTestingController.expectOne(`${apiUrl}/1/fechar`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
