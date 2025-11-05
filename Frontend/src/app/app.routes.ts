import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import path from 'path';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: CadastroComponent },
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
