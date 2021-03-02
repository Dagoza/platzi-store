import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { environment } from 'src/environments/environment';

fdescribe('ProductsService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductsService;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpClient = TestBed.get(HttpClient); // A9+ get change to inject
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //agrupar casos de prueba
  describe('tests for getAllProducts', () => {
    it('sholud return products', () => {
      // arrange - preparar
      const expectData = [
        {
          id: '1234',
          title: 'test',
          price: 125,
          description: 'text',
          image: 'img/img.jpg',
        },
        {
          id: '1236',
          title: 'test',
          price: 125,
          description: 'text',
          image: 'img/img.jpg',
        },
      ];

      let dataError;
      let dataResponse;

      // act - actuacion
      service.getAllProducts().subscribe(
        (response) => {
          dataResponse = response;
        },
        (err) => {
          dataError = err;
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.url_api}/products`
      );
      req.flush(expectData); // mock de datos

      // assert
      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });

});
