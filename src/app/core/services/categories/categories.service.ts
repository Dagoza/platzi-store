import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@core/models/Category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories(){
    return this.http.get<Category[]>(`${environment.url_store_api}/categories`)
  }

  getCategory(id: string){
    return this.http.get<Category>(`${environment.url_store_api}/categories/${id}`)
  }

  checkCategory(name: string){
    return this.http.post(`${environment.url_store_api}/categories/availability`,{name})
  }

  createCategory(data: Partial<Category>){
    return this.http.post<Category>(`${environment.url_store_api}/categories`, data)
  }

  updateCategory(id: string, data: Partial<Category>){
    return this.http.put<Category>(`${environment.url_store_api}/categories/${id}`, data)
  }

}
