import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LojaComponent } from './components/loja/loja.component';
import { TesteComponent } from './components/teste/teste.component';

const routes: Routes = [
  {path:'loja', component: LojaComponent},
  {path:'teste', component: TesteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
