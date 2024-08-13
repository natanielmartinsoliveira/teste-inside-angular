import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PedidosService } from '../../services/pedidos.service';
import { AdicionarProdutoComponent } from './adicionar-produto.component';
import { Produto as ProdutoModel } from '../../models/pedido.model';

describe('AdicionarProdutoComponent', () => {
  let component: AdicionarProdutoComponent;
  let fixture: ComponentFixture<AdicionarProdutoComponent>;
  let pedidosService: PedidosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [AdicionarProdutoComponent],
      providers: [
        PedidosService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarProdutoComponent);
    component = fixture.componentInstance;
    pedidosService = TestBed.inject(PedidosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call adicionarProduto from PedidosService when adding a product', () => {
    const produto: ProdutoModel = { id: 1, nome: 'Produto Teste', descricao: 'Descrição Teste', preco: 100 };
    spyOn(pedidosService, 'adicionarProduto').and.returnValue(of());
    component.produto = produto; 
    component.adicionarProduto(); 
    expect(pedidosService.adicionarProduto).toHaveBeenCalledWith(1, produto); 
  });
});
