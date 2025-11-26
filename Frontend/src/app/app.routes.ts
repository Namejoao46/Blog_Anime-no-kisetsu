import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CriarNoticiaComponent } from './pages/criar-noticia/criar-noticia.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'criarNoticia', component: CriarNoticiaComponent},
    { path: 'noticia/:id', component: NoticiasComponent },
    { path: 'categoria/:categoria', component: CategoriaComponent },
    { path: 'categoria/:categoria/:subcategoria', component: CategoriaComponent },
    
    { path: '', redirectTo: 'login', pathMatch: 'full' }
    
];
