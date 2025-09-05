import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './servicios/auth.guard';
import { AuthPermissionGuard } from './auth/auth-permission.guard';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonViewComponent } from './pokemon/pokemon-view/pokemon-view.component';
const routes: Routes = [
  { path: "", redirectTo: "PokemonList", pathMatch: "full" },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'PokemonList',
    component: PokemonListComponent,
  },
  {
    path: 'Pokemon',
    component: PokemonViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
