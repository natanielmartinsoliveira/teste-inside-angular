import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PedidosService } from '../../services/pedidos.service';
import { ListarPedidosComponent } from './listar-pedidos.component';
import { Pedido as PedidoModel } from '../../models/pedido.model';

describe('ListarPedidosComponent', () => {
  let component: ListarPedidosComponent;
  let fixture: ComponentFixture<ListarPedidosComponent>;
  let pedidosService: PedidosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListarPedidosComponent],
      providers: [PedidosService]
    }).compileComponents();
    fixture = TestBed.createComponent(ListarPedidosComponent);
    component = fixture.componentInstance;
    pedidosService = TestBed.inject(PedidosService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pedidos from the service', (done) => {
    const mockPedidos: PedidoModel[] = [
      { id: 1, fechado: false, produtos: [] },
      { id: 2, fechado: true, produtos: [] }
    ];
    spyOn(pedidosService, 'listarPedidos').and.returnValue(of(mockPedidos));
    fixture.detectChanges();
    component.pedidos$.subscribe((pedidos) => {
      expect(pedidos).toEqual(mockPedidos);
      done();
    });
  });
});
