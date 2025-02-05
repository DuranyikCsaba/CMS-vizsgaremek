import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GyakoriAutokComponent } from './gyakori-autok/gyakori-autok.component';
import { NavComponent } from './nav/nav.component';
import { FooldalComponent } from './fooldal/fooldal.component';
import { CreateHirdetesComponent } from './create-hirdetes/create-hirdetes.component';
import { HirdetesComponent } from './hirdetes/hirdetes.component';
import { HirdetesListComponent } from './hirdetes-list/hirdetes-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/fooldal', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gyakori-autok', component: GyakoriAutokComponent },
  { path: 'nav', component: NavComponent },
  { path: 'fooldal', component: FooldalComponent },
  { path: 'create-hirdetes', component: CreateHirdetesComponent },
  { path: 'hirdetes', component: HirdetesComponent },
  { path: 'hirdetes-list', component: HirdetesListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
