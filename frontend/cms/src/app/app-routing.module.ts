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
import { ForumComponent } from './forum/forum.component';
import { ProfilComponent } from './profil/profil.component';
import { GyikAtiratasComponent } from './gyik-atiratas/gyik-atiratas.component';
import { GyikAdasveteliComponent } from './gyik-adasveteli/gyik-adasveteli.component';
import { GyikKotelezoComponent } from './gyik-kotelezo/gyik-kotelezo.component';
import { GyikCascoComponent } from './gyik-casco/gyik-casco.component';
import { GyikBetetlapComponent } from './gyik-betetlap/gyik-betetlap.component';
import { RolunkComponent } from './rolunk/rolunk.component';
import { AdminComponent } from './admin/admin.component';
import { ModeratorsComponent } from './moderators/moderators.component';


const routes: Routes = [
  { path: '', redirectTo: '/fooldal', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gyakori-autok', component: GyakoriAutokComponent },
  { path: 'nav', component: NavComponent },
  { path: 'fooldal', component: FooldalComponent },
  { path: 'create-hirdetes', component: CreateHirdetesComponent },
  { path: 'hirdetes', component: HirdetesComponent },
  { path: 'hirdetes-list', component: HirdetesListComponent },
  { path: 'forum', component: ForumComponent},
  { path: 'profil', component: ProfilComponent },
  { path: 'gyik-atiratas', component: GyikAtiratasComponent },
  { path: 'gyik-adasveteli', component: GyikAdasveteliComponent },
  { path: 'gyik-kotelezo', component: GyikKotelezoComponent },
  { path: 'gyik-casco', component: GyikCascoComponent },
  { path: 'gyik-betetlap', component: GyikBetetlapComponent },
  { path: 'rolunk', component: RolunkComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'moderators', component:ModeratorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
