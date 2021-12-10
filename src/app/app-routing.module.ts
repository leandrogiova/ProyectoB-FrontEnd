import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MibarComponent } from './mibar/mibar.component';

const routes: Routes = [
//  {path: 'inicio', component: AppComponent},
  {path: 'home', component: HomeComponent},
  {path: 'mibar', component: MibarComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},  // cuando no se le especifica nada entra en home
  {path: '**', component: Error}  // cuando no matchea con nada entra en error 404 - no encontrado
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
