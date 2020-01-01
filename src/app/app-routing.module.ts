import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPageComponent } from '@modules/layout/page/page.component';
import { LoginPageComponent } from '@modules/login/page/page.component';
import { ImportPageComponent } from '@modules/import/page/page.component';
import { SearchPageComponent } from '@modules/search/page/page.component';
import { ConsultPageComponent } from '@modules/consult/page/page.component';
import { BiodbPageComponent } from '@modules/biodb/page/page.component';

import { LoginRedirect } from '@shared/guards/login-redirect.service';
import { EnsureAuthenticated } from '@shared/guards/ensure-authenticated.service';
import { EnsureAdmin } from '@shared/guards/ensure-admin.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search'},
  { path: 'login', component: LoginPageComponent, canActivate: [LoginRedirect]},
  { path: '', component: LayoutPageComponent, children: [
    { path: 'home', redirectTo: 'search'},
    { path: 'import', component: ImportPageComponent, canActivate: [EnsureAdmin]},
    { path: 'search', component: SearchPageComponent},
    { path: 'consult/:type/:id', component: ConsultPageComponent},
    { path: 'biodb', component: BiodbPageComponent, canActivate: [EnsureAdmin]},
  ], canActivate: [EnsureAuthenticated]},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
