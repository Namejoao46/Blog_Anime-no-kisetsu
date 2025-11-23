import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'http://localhost:8080/noticias';

  constructor(private http: HttpClient) {}

  listarNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  criarNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.apiUrl, noticia);
  }
  buscarPorCategoria(categoria: string, subcategoria: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.apiUrl}?categoria=${categoria}&subcategoria=${subcategoria}`);
  }
}

export type { Noticia };
