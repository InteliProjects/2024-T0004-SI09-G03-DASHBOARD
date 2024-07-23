import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiconnectService } from './apiconnect.service';

describe('ApiconnectService', () => {
  let service: ApiconnectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiconnectService]
    });
    service = TestBed.inject(ApiconnectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get CID for a specific plant', () => {
    const plant = 'plant1';
    const mockCars = [
      { mes: 'January', descricao: 'CID 1', quantidade_atestados: 5 },
      { mes: 'February', descricao: 'CID 2', quantidade_atestados: 10 }
    ];

    service.getCars(plant).subscribe(cars => {
      expect(cars.body).toEqual(mockCars);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/${plant}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCars);
  });

  it('should get all CIDs', () => {
    const mockCars = [
      { mes: 'January', descricao: 'CID 1', quantidade_atestados: 5 },
      { mes: 'February', descricao: 'CID 2', quantidade_atestados: 10 }
    ];

    service.getCarsAll().subscribe(cars => {
      expect(cars.body).toEqual(mockCars);
    });

    const req = httpMock.expectOne(service.BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockCars);
  });

  it('should get plants', () => {
    const mockPlants = [
      { total_sessoes: 10, departamento: 'Department 1', total_dias: 30, total_atestados: 20, anc: null },
      { total_sessoes: 15, departamento: 'Department 2', total_dias: 40, total_atestados: 25, anc: null }
    ];

    service.getPlants().subscribe(plants => {
      expect(plants.body).toEqual(mockPlants);
    });

    const req = httpMock.expectOne(service.BASE_URL_PLANTS);
    expect(req.request.method).toBe('GET');
    req.flush(mockPlants);
  });

  it('should get engage data', () => {
    const mockEngageData = [
      { year: 2023, engagement_percent: 80, trust_index: 70, culture_audit: 90 }
    ];

    service.getEngage().subscribe(engageData => {
      expect(engageData.body).toEqual(mockEngageData);
    });

    const req = httpMock.expectOne(service.BASE_URL_ENGAGE);
    expect(req.request.method).toBe('GET');
    req.flush(mockEngageData);
  });

  it('should get stiba data', () => {
    const mockStibaData = [
      { avg_particip: 50, average_nota_stiba: 8 }
    ];

    service.getStiba().subscribe(stibaData => {
      expect(stibaData.body).toEqual(mockStibaData);
    });

    const req = httpMock.expectOne(service.BASE_URL_STIBA);
    expect(req.request.method).toBe('GET');
    req.flush(mockStibaData);
  });
});
