import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap, convertToParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { RemoverProdutoComponent } from './remover-produto.component';
import { PedidosService } from '../../services/pedidos.service';

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.snapshot = {
      paramMap: convertToParamMap({
        id: '1',
        produtoId: '10'
      })
    } as ActivatedRouteSnapshot;
  }
}

describe('RemoverProdutoComponent', () => {
  let component: RemoverProdutoComponent;
  let fixture: ComponentFixture<RemoverProdutoComponent>;
  let pedidosServiceSpy: jasmine.SpyObj<PedidosService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    pedidosServiceSpy = jasmine.createSpyObj('PedidosService', ['removerProduto']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [RemoverProdutoComponent],
      providers: [
        { provide: PedidosService, useValue: pedidosServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should remove the product and navigate to /pedidos on success', () => {
    pedidosServiceSpy.removerProduto.and.returnValue(of(void 0)); 
    component.removerProduto();
    expect(pedidosServiceSpy.removerProduto).toHaveBeenCalledWith(1, 10);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pedidos']);
  });
});
