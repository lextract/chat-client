import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { LoginComponent }   from './login/login.component';
import { MessengerComponent }      from './messenger/messenger.component';
//import { HeroDetailComponent }  from './hero-detail.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
  { path: 'messenger',     component: MessengerComponent },
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
