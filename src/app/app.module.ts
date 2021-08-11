import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ValidationDesactivationComponent } from './modals/validation-desactivation/validation-desactivation.component';
import { EtatOperationComponent } from './modals/etat-operation/etat-operation.component';
import { DetailDonnesComponent } from './modals/detail-donnes/detail-donnes.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NotificationsService } from './services/notifications.service';

import { AuthGuard } from './services/auth.Guard';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ValidationDesactivationComponent,
    EtatOperationComponent,
    DetailDonnesComponent,
    LoginPageComponent,
  ],
  providers: [
    NotificationsService,
    AuthGuard,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
