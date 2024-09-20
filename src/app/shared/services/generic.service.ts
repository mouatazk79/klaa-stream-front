import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Constants } from '../env/constants';
import { GenericResponse } from '../models/generic-page-response';
export interface ServiceConfig {
  resourceEndpoint: string;
}

export const SERVICE_CONFIG = new InjectionToken<ServiceConfig>('ServiceConfig');

@Injectable({
  providedIn: 'root'
})
export class GenericService<TModel, TDto> {
  protected readonly baseUrl: string;
  protected readonly resourceEndpoint: string;

  constructor(
    protected httpClient: HttpClient,
    @Inject(SERVICE_CONFIG) config: ServiceConfig,
    private constants:Constants
  ) {
    this.baseUrl = constants.rootAPI;
    this.resourceEndpoint = config.resourceEndpoint;
  }

  getList() {
    return this.httpClient.get<GenericResponse<TModel>>(`${this.baseUrl}${this.resourceEndpoint}`);
  }

  getById(id: any) {
    return this.httpClient.get<TModel>(`${this.baseUrl}${this.resourceEndpoint}/${id}`);
  }

  add(dto: TDto) {
    return this.httpClient.post<TModel>(`${this.baseUrl}${this.resourceEndpoint}`, dto);
  }

  update(dto: TDto) {
    return this.httpClient.put<TModel>(`${this.baseUrl}${this.resourceEndpoint}`, dto);
  }

  remove(id: any) {
    return this.httpClient.delete<number>(`${this.baseUrl}${this.resourceEndpoint}/${id}`);
  }
}
