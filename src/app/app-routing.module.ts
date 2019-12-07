import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPageComponent } from '@modules/layout/page/page.component';
import { LoginPageComponent } from '@modules/login/page/page.component';
import { HomePageComponent } from '@modules/home/page/page.component';
import { ImportPageComponent } from '@modules/import/page/page.component';
import { SearchPageComponent } from '@modules/search/page/page.component';
import { ConsultPageComponent } from '@modules/consult/page/page.component';
import { BiodbPageComponent } from '@modules/biodb/page/page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '', component: LayoutPageComponent, children: [
    { path: 'home', component: HomePageComponent},
    { path: 'import', component: ImportPageComponent},
    { path: 'search', component: SearchPageComponent},
    { path: 'consult/:type/:id', component: ConsultPageComponent},
    { path: 'biodb', component: BiodbPageComponent},
    { path: 'login', component: LoginPageComponent},
  ]},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
