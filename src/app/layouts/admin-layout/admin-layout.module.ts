import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

//importation material
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatMenuModule} from '@angular/material/menu';


//importaion des pages et composant
import { PrixBetailComponent } from 'app/pages/dashbord/prix-betail/prix-betail.component';
import { PresentationBetailComponent } from 'app/pages/dashbord/presentation-betail/presentation-betail.component';
import { TermeEchangeComponent } from 'app/pages/dashbord/terme-echange/terme-echange.component';
import { Tableau1Component } from 'app/pages/dashbord/tableau1/tableau1.component';
import { PaysComponent } from 'app/pages/parametreGlobeau/pays/pays.component';
import { LangueComponent } from 'app/pages/parametreGlobeau/langue/langue.component';
import { DevisesComponent } from 'app/pages/parametreGlobeau/devises/devises.component';
import { GestionSimComponent } from 'app/pages/parametreGlobeau/gestion-sim/gestion-sim.component';
import { TypeAlertesComponent } from 'app/pages/parametreGlobeau/type-alertes/type-alertes.component';
import { DecoupageAdminComponent } from 'app/pages/parametres/decoupage-admin/decoupage-admin.component';
import { Niveau1Component } from 'app/pages/parametres/uniteAdmin/niveau1/niveau1.component';
import { Niveau2Component } from 'app/pages/parametres/uniteAdmin/niveau2/niveau2.component';
import { Niveau3Component } from 'app/pages/parametres/uniteAdmin/niveau3/niveau3.component';
import { TypeMarcheComponent } from 'app/pages/parametres/type-marche/type-marche.component';
import { PeriodiciteMarcheComponent } from 'app/pages/parametres/periodicite-marche/periodicite-marche.component';
import { PeriodiciteEnquettesComponent } from 'app/pages/parametres/periodicite-enquettes/periodicite-enquettes.component';
import { AnimauxComponent } from 'app/pages/parametres/animaux/animaux.component';
import { TypeAnimauxComponent } from 'app/pages/parametres/type-animaux/type-animaux.component';
import { RaceComponent } from 'app/pages/parametres/race/race.component';
import { LaitComponent } from 'app/pages/parametres/lait/lait.component';
import { UniteMesureComponent } from 'app/pages/parametres/unite-mesure/unite-mesure.component';
import { SecteurActiviteComponent } from 'app/pages/parametres/secteur-activite/secteur-activite.component';
import { TypeIntrantComponent } from 'app/pages/parametres/type-intrant/type-intrant.component';
import { IntrantComponent } from 'app/pages/parametres/intrant/intrant.component';
import { PartenairesComponent } from 'app/pages/parametres/partenaires/partenaires.component';
import { PartenaireComponent } from 'app/pages/parametres/partenaires/partenaire/partenaire.component';
import { PostesComponent } from 'app/pages/parametres/postes/postes.component';
import { AnimalsComponent } from 'app/pages/parametres/animal/animals/animals.component';
import { AnimalTypeComponent } from 'app/pages/parametres/animal/animal-type/animal-type.component';
import { AssociationComponent } from 'app/pages/parametres/association/association.component';
import { ActeursComponent } from 'app/pages/parametres/acteurs/acteurs.component';
import { SpecialitesComponent } from 'app/pages/parametres/specialites/specialites.component';
import { FicheSimbComponent } from 'app/pages/saisie/fiche-simb/fiche-simb.component';
import { FicheEtandueComponent } from 'app/pages/saisie/fiche-etandue/fiche-etandue.component';
import { CollectesComponent } from 'app/pages/saisie/collectes/collectes.component';
import { Q2Component } from 'app/pages/saisie/questionnaire/q2/q2.component';
import { Q3Component } from 'app/pages/saisie/questionnaire/q3/q3.component';
import { Q4Component } from 'app/pages/saisie/questionnaire/q4/q4.component';
import { Q5Component } from 'app/pages/saisie/questionnaire/q5/q5.component';
import { Q6Component } from 'app/pages/saisie/questionnaire/q6/q6.component';
import { Q7Component } from 'app/pages/saisie/questionnaire/q7/q7.component';
import { Q8Component } from 'app/pages/saisie/questionnaire/q8/q8.component';
import { OffresVentesComponent } from 'app/pages/Offres/offres-ventes/offres-ventes.component';
import { OffresAchatsComponent } from 'app/pages/Offres/offres-achats/offres-achats.component';
import { ConclureOffresComponent } from 'app/pages/Offres/conclure-offres/conclure-offres.component';
import { ValidationOffresComponent } from 'app/pages/validation/validation-offres/validation-offres.component';
import { PredicatioPrixComponent } from 'app/pages/predication/predicatio-prix/predicatio-prix.component';
import { ProduitAgricolsComponent } from 'app/pages/predication/produit-agricols/produit-agricols.component';
import { BetailComponent } from 'app/pages/predication/betail/betail.component';
import { UtilisateurComponent } from 'app/pages/administration/utilisateur/utilisateur.component';
import { UtilisateursComponent } from 'app/pages/administration/utilisateurs/utilisateurs.component';
import { GroupesComponent } from 'app/pages/administration/groupes/groupes.component';
import { EnquetteursComponent } from 'app/pages/administration/enquetteurs/enquetteurs.component';
import { SuperviseursComponent } from 'app/pages/administration/superviseurs/superviseurs.component';
import { GestionDroitsComponent } from 'app/pages/administration/gestion-droits/gestion-droits.component';
import { VocationMarchesComponent } from 'app/pages/parametres/vocation-marches/vocation-marches.component';

//importation des composants sim2g


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,

    //impor des composants material
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,

    //declaration des composants sim2g
    PrixBetailComponent,
    PresentationBetailComponent,
    TermeEchangeComponent,
    Tableau1Component,
    PaysComponent,
    LangueComponent,
    DevisesComponent,
    GestionSimComponent,
    TypeAlertesComponent,
    DecoupageAdminComponent,
    Niveau1Component,
    Niveau2Component,
    Niveau3Component,
    TypeMarcheComponent,
    VocationMarchesComponent,
    PeriodiciteMarcheComponent,
    PeriodiciteEnquettesComponent,
    AnimauxComponent,
    TypeAnimauxComponent,
    RaceComponent,
    LaitComponent,
    UniteMesureComponent,
    SecteurActiviteComponent,
    TypeIntrantComponent,
    IntrantComponent,
    PartenairesComponent,
    PartenaireComponent,
    PostesComponent,
    AnimalsComponent,
    AnimalTypeComponent,
    AssociationComponent,
    ActeursComponent,
    SpecialitesComponent,
    FicheSimbComponent,
    FicheEtandueComponent,
    CollectesComponent,
    Q2Component,
    Q3Component,
    Q4Component,
    Q5Component,
    Q6Component,
    Q7Component,
    Q8Component,
    OffresVentesComponent,
    OffresAchatsComponent,
    ConclureOffresComponent,
    ValidationOffresComponent,
    PredicatioPrixComponent,
    ProduitAgricolsComponent,
    BetailComponent,
    UtilisateurComponent,
    UtilisateursComponent,
    GroupesComponent,
    EnquetteursComponent,
    SuperviseursComponent,
    GestionDroitsComponent,
  ]
})

export class AdminLayoutModule {}
