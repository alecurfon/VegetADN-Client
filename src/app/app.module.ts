import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from '@modules/layout/layout.module';
import { LoginModule } from '@modules/login/login.module';
import { HomeModule } from '@modules/home/home.module';
import { ImportModule } from '@modules/import/import.module';
import { SearchModule } from '@modules/search/search.module';
import { ConsultModule } from '@modules/consult/consult.module';
import { BiodbModule } from '@modules/biodb/biodb.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { RestfulService } from '@shared/services/restful.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    LoginModule,
    HomeModule,
    ImportModule,
    SearchModule,
    ConsultModule,
    BiodbModule
  ],
  providers: [RestfulService],
  bootstrap: [AppComponent]
})
export class AppModule { }
