import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from '@modules/layout/layout.module';
import { LoginModule } from '@modules/login/login.module';
import { ImportModule } from '@modules/import/import.module';
import { SearchModule } from '@modules/search/search.module';
import { ConsultModule } from '@modules/consult/consult.module';
import { BiodbModule } from '@modules/biodb/biodb.module';

import { HttpClientModule } from '@angular/common/http';
import { RestfulService } from '@shared/services/restful.service';
import { AuthService } from '@shared/services/auth.service';
import { LoginRedirect } from '@shared/guards/login-redirect.service';
import { EnsureAuthenticated } from '@shared/guards/ensure-authenticated.service';
import { EnsureAdmin } from '@shared/guards/ensure-admin.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,AppRoutingModule,HttpClientModule,
    LayoutModule,LoginModule,
    ImportModule,SearchModule,ConsultModule,BiodbModule],
  providers: [RestfulService,AuthService,LoginRedirect,EnsureAuthenticated,EnsureAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
