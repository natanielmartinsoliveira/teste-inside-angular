import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FecharPedidoComponent } from './fechar-pedido.component';
import { PedidosService } from '../../services/pedidos.service';

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.snapshot = {
      paramMap: convertToParamMap({
        id: '1',
      })
    } as ActivatedRouteSnapshot;
  }
}

describe('FecharPedidoComponent', () => {
  let component: FecharPedidoComponent;
  let fixture: ComponentFixture<FecharPedidoComponent>;
  let pedidosServiceSpy: jasmine.SpyObj<PedidosService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    pedidosServiceSpy = jasmine.createSpyObj('PedidosService', ['fecharPedido']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [FecharPedidoComponent],
      providers: [
        { provide: PedidosService, useValue: pedidosServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FecharPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the pedido and navigate to /pedidos on success', () => {
    pedidosServiceSpy.fecharPedido.and.returnValue(of(void 0));
    component.fecharPedido();
    expect(pedidosServiceSpy.fecharPedido).toHaveBeenCalledWith(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pedidos']);
  });

  it('should handle errors when closing the pedido', () => {
    const errorResponse = new Error('Failed to close the pedido');
    pedidosServiceSpy.fecharPedido.and.returnValue(throwError(() => errorResponse));
    component.fecharPedido();
    expect(pedidosServiceSpy.fecharPedido).toHaveBeenCalledWith(1);
  });
});
