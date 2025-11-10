import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Noticia{
  titulo: string;
  texto: string;
  categoria?: string;
  subcategoria?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'http://localhost:8080/noticias';
  constructor(private http: HttpClient) {}

  criarNoticia(noticia: Noticia){
    return this.http.post<Noticia>(this.apiUrl, noticia);
  }
}
