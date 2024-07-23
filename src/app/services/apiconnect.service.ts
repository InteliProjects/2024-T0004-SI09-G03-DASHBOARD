import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdmDashboardComponent } from '../adm-components/adm-dashboard/adm-dashboard.component';

type Car = {
  mes: string;
  descricao: string;
  quantidade_atestados: number;
};

type Plant = {
    total_sessoes: number,
    departamento: string,
    total_dias: number,
    total_atestados: number,
    anc: null
}

type Engage = {
  year: number,
  engagement_percent: number,
  trust_index: number,
  culture_audit: number
}

type Stiba = {
  avg_particip: number,
  average_nota_stiba: number
}



@Injectable({
  providedIn: 'root',
})


export class ApiconnectService {
  BASE_URL = environment.apiUrl;
  BASE_URL_PLANTS = environment.apiUrlGeral;
  BASE_URL_ENGAGE = environment.apiUrlEngage;
  BASE_URL_STIBA = environment.apiUrlStiba;

  constructor(private http: HttpClient) {}

  getCars(plant: string): Observable<HttpResponse<Car[]>> {
    return this.http.get<any>(`${this.BASE_URL}/${plant}`, {
      observe: 'response',
    });
  }

  getCarsAll(): Observable<HttpResponse<Car[]>> {
    return this.http.get<any>(`${this.BASE_URL}`, {
      observe: 'response',
    });
  }

  getPlants(): Observable<HttpResponse<Plant[]>> {
    return this.http.get<any>(`${this.BASE_URL_PLANTS}`, {
      observe: 'response',
    });
  }

  getEngage(): Observable<HttpResponse<Engage[]>> {
    return this.http.get<any>(`${this.BASE_URL_ENGAGE}`, {
      observe: 'response',
    });
  }
  getStiba(): Observable<HttpResponse<Stiba[]>> {
    return this.http.get<any>(`${this.BASE_URL_STIBA}`, {
      observe: 'response',
    });
  }
}
