import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
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

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },

    //routing des composants sim2g
    { path: 'prix-betail',              component: PrixBetailComponent },
    { path: 'presentation-betail',      component: PresentationBetailComponent },
    { path: 'terme-echange',            component: TermeEchangeComponent },
    { path: 'tableau-1',                component: Tableau1Component },
    { path: 'pays',                     component: PaysComponent },
    { path: 'langue',                   component: LangueComponent },
    { path: 'devises',                  component: DevisesComponent },
    { path: 'gestion-sim',              component: GestionSimComponent },
    { path: 'types-alertes',            component: TypeAlertesComponent },
    { path: 'decoupage-admin',          component: DecoupageAdminComponent },
    { path: 'niveau-1',                 component: Niveau1Component },
    { path: 'niveau-2',                 component: Niveau2Component },
    { path: 'niveau-3',                 component: Niveau3Component },
    { path: 'type-marche',              component: TypeMarcheComponent },
    { path: 'vocation-marche',          component: VocationMarchesComponent },
    { path: 'periodicite-marche',       component: PeriodiciteMarcheComponent },
    { path: 'periodicite-enquettes',    component: PeriodiciteEnquettesComponent },
    { path: 'animaux',                  component: AnimauxComponent },
    { path: 'type-animaux',             component: TypeAnimauxComponent },
    { path: 'race',                     component: RaceComponent },
    { path: 'lait',                     component: LaitComponent },
    { path: 'unite-mesure',             component: UniteMesureComponent },
    { path: 'secteur-activite',         component: SecteurActiviteComponent },
    { path: 'type-intrant',             component: TypeIntrantComponent },
    { path: 'intrant',                  component: IntrantComponent },
    { path: 'partenaires',              component: PartenairesComponent },
    { path: 'partenaire',               component: PartenaireComponent },
    { path: 'postes',                   component: PostesComponent },
    { path: 'animals',                  component: AnimalsComponent },
    { path: 'animal-type',              component: AnimalTypeComponent },
    { path: 'association',              component: AssociationComponent },
    { path: 'acteurs',                  component: ActeursComponent },
    { path: 'specialistes',             component: SpecialitesComponent },
    { path: 'fiche-sim-b',              component: FicheSimbComponent },
    { path: 'fiche-etandue',            component: FicheEtandueComponent },
    { path: 'collectes',                component: CollectesComponent },
    { path: 'q2',                       component: Q2Component },
    { path: 'q3',                       component: Q3Component },
    { path: 'q4',                       component: Q4Component },
    { path: 'q5',                       component: Q5Component },
    { path: 'q6',                       component: Q6Component },
    { path: 'q7',                       component: Q7Component },
    { path: 'q8',                       component: Q8Component },
    { path: 'offres-vente',             component: OffresVentesComponent },
    { path: 'offres-achat',             component: OffresAchatsComponent },
    { path: 'conclure-offres',          component: ConclureOffresComponent },
    { path: 'validation-offres',        component: ValidationOffresComponent },
    { path: 'predication-prix',         component: PredicatioPrixComponent },
    { path: 'produit-agricols',         component: ProduitAgricolsComponent },
    { path: 'betail',                   component: BetailComponent },
    { path: 'utilisateur',              component: UtilisateurComponent },
    { path: 'utilisateurs',             component: UtilisateursComponent },
    { path: 'groupe',                   component: GroupesComponent },
    { path: 'enquetteurs',              component: EnquetteursComponent },
    { path: 'superviseurs',             component: SuperviseursComponent },
    { path: 'gestion-droit',            component: GestionDroitsComponent }
];
