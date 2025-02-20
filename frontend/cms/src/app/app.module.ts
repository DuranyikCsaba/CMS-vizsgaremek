import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GyakoriAutokComponent } from './gyakori-autok/gyakori-autok.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './auth/auth.service';
import { NavbarService } from './services/navbar.service';
import { FooterComponent } from './footer/footer.component';
import { FooldalComponent } from './fooldal/fooldal.component';
import { CreateHirdetesComponent } from './create-hirdetes/create-hirdetes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HirdetesComponent } from './hirdetes/hirdetes.component';
import { HirdetesListComponent } from './hirdetes-list/hirdetes-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForumComponent } from './forum/forum.component';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    GyakoriAutokComponent,
    NavComponent,
    FooterComponent,
    FooldalComponent,
    CreateHirdetesComponent,
    HirdetesComponent,
    HirdetesListComponent,
    ForumComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AuthService, NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
