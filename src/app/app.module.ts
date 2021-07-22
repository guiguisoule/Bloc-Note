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
import { PaysService } from './pages/parametreGlobeau/pays/model-service/pays.service';
import { AnimalTypeService } from './pages/parametres/animal/animal-type/model-service/animal-type.service';
import { AnimalService } from './pages/parametres/animal/animals/model-service/animal.service';
import { DeviseService } from './pages/parametreGlobeau/devises/model-service/devise.service';
import { LangueService } from './pages/parametreGlobeau/langue/model-service/langue.service';
import { SimService } from './pages/parametreGlobeau/gestion-sim/model-service/sim.service';
import { DecoupageAdminService } from './pages/parametres/decoupage-admin/model-service/decoupage-admin.service';
import { Niveau1Service } from './pages/parametres/uniteAdmin/niveau1/model-service/niveau1.service';
import { Niveau2Service } from './pages/parametres/uniteAdmin/niveau2/model-service/niveau2.service';
import { Niveau3Service } from './pages/parametres/uniteAdmin/niveau3/model-service/niveau3.service';
import { TypeMarcheService } from './pages/parametres/type-marche/model-service/type-marche.service';
import { PeriodiciteMarketService } from './pages/parametres/periodicite-marche/model-service/periodicite-market.service';
import { VocationMarketService } from './pages/parametres/vocation-marches/model-service/vocation-market.service';
import { PeriodiciteEnquetteService } from './pages/parametres/periodicite-enquettes/model-service/periodicite-enquette.service';
import { RaceService } from './pages/parametres/race/model-service/race.service';


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
    PaysService,
    AnimalTypeService,
    AnimalService,
    DeviseService,
    LangueService,
    SimService,
    DecoupageAdminService,
    Niveau1Service,
    Niveau2Service,
    Niveau3Service,
    TypeMarcheService,
    PeriodiciteMarketService,
    VocationMarketService,
    PeriodiciteEnquetteService,
    RaceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
