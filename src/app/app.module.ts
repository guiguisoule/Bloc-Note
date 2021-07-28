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
import { SecteursService } from './pages/parametres/secteur-activite/model-service/secteurs.service';
import { UniteMesureService } from './pages/parametres/unite-mesure/model-service/unite-mesure.service';
import { TypeIntrantService } from './pages/parametres/type-intrant/model-service/type-intrant.service';
import { PartenaireService } from './pages/parametres/partenaires/model-service/partenaire.service';
import { PosteService } from './pages/parametres/postes/model-service/poste.service';
import { AssociationService } from './pages/parametres/association/model-service/association.service';
import { SpecialiteService } from './pages/parametres/specialites/model-service/specialite.service';
import { ActeurService } from './pages/parametres/acteurs/model-service/acteur.service';
import { Questionnaire3Service } from './pages/saisie/questionnaire/q2/model-service/questionnaire3.service';
import { OffreService } from './pages/Offres/model-service/offre.service';
import { AuthGuard } from './services/auth.Guard';
import { AdminGuard } from './services/admin.Guard';


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
    RaceService,
    SecteursService,
    UniteMesureService,
    TypeIntrantService,
    PartenaireService,
    PosteService,
    AssociationService,
    SpecialiteService,
    ActeurService,
    Questionnaire3Service,
    OffreService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
