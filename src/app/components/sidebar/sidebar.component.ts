import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/login-page/model-service/auth.service';
import { OperateurData } from 'app/login-page/model-service/operateur.model';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },

]

export const TABLEAU_BORD: RouteInfo[] = [
    //Menu Tableau de bord
    { 
      path: '/prix-betail', 
      title: 'Prix Du Bétail',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/presentation-betail', 
      title: 'Presentqtion Bétail',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/terme-echange', 
      title: 'Terme De L\'echange',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/tableau-1', 
      title: 'Tableau 1',  
      icon: 'dashboard', 
      class: '' 
    }
  ]

  export const PARAMETRE_GLOBALE: RouteInfo[] = [
    //Menu Parametre Globale
    { 
      path: '/pays', 
      title: 'Pays',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/langue', 
      title: 'Langue',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/devises', 
      title: 'Devises',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/gestion-sim', 
      title: 'Gestion Des SIM',
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/types-alertes', 
      title: 'Type Alerte',  
      icon: 'dashboard', 
      class: '' 
    },
  ]

  export const PARAMETRE: RouteInfo[] = [
    //Menu Parametre
    { 
      path: '/decoupage-admin', 
      title: 'Decoupage Administratif',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/niveau-1', 
      title: 'Niveau 1',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/niveau-2', 
      title: 'Niveau 2',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/niveau-3', 
      title: 'Niveau 3',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/type-marche', 
      title: 'Type Marche',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/vocation-marche', 
      title: 'Vocation Marche',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/periodicite-marche', 
      title: 'Periodicite Marches',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/periodicite-enquettes', 
      title: 'Periodicite Enquettes',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/animals', 
      title: 'Animaux',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/animal-type', 
      title: 'Type Animaux',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/race', 
      title: 'Race',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/lait', 
      title: 'Lait',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/unite-mesure', 
      title: 'Unites De Mesures',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/secteur-activite', 
      title: 'Secteur Activites',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/type-intrant', 
      title: 'Type Intrant',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/intrant', 
      title: 'Intrant',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/partenaires', 
      title: 'Partenaires',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/postes', 
      title: 'Postes',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/association', 
      title: 'Association',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/acteurs', 
      title: 'Acteurs',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/specialistes', 
      title: 'Specialistes',  
      icon: 'dashboard', 
      class: '' 
    },
  ]
  
  export const SAISIE_DONNEES: RouteInfo[] = [
    //Menu saisie des donnees
    { 
      path: '/fiche-sim-b', 
      title: 'Fiche SIM B',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/fiche-etandue', 
      title: 'Fiche Etandue',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/collectes', 
      title: 'Collectes',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/q2', 
      title: 'Q2',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/q3', 
      title: 'Q3',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/q4', 
      title: 'Q4',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/q5', 
      title: 'Q5',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/q6', 
      title: 'Q6',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/q7', 
      title: 'Q7',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/q8', 
      title: 'Q8',  
      icon: 'dashboard', 
      class: '' 
    },
  ]

  export const OFFRES_DEMANDE: RouteInfo[] = [
    //Menu Offres et Demande
    { 
      path: '/offres-vente', 
      title: 'Offres De Ventes',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/offres-achat', 
      title: 'Offres D\'achats',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/conclure-offres', 
      title: 'Conclure Offre',  
      icon: 'dashboard', 
      class: '' 
    },
  ]

  export const VALIDATION: RouteInfo[] = [
    //Menu Validation
    { 
      path: '/validation-offres', 
      title: 'Validation Des Offres',  
      icon: 'dashboard', 
      class: '' 
    },
  ]

  export const PRESENTATION_PRIX: RouteInfo[] = [
    //Menu Presentation Des Prix
    { 
      path: '/predication-prix', 
      title: 'Presentation Des Prix',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/produit-agricols', 
      title: 'Produits Agricoles',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/betail', 
      title: 'Betail',  
      icon: 'dashboard', 
      class: '' 
    },
  ]

  export const ADMINISTRATION: RouteInfo[] = [
    //Menu Administration SIM2G
    { 
      path: '/utilisateurs', 
      title: 'Utilisateurs',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/groupe', 
      title: 'Groupe',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/enquetteurs', 
      title: 'Enquetteurs',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/superviseurs', 
      title: 'Superviseurs',  
      icon: 'dashboard', 
      class: '' 
    },
    { 
      path: '/gestion-droit', 
      title: 'Gestion Des Droits Fonctions',  
      icon: 'dashboard', 
      class: '' 
    },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  //tableux contenant les instance des options du menu
  menuItems: any[];
  menuTableauBord: any[];
  menuParametreGlobale: any[];
  menuParametres: any[];
  menuSaisieDonnees: any[];
  menuOffresDemande: any[];
  menuValidation: any[];
  menuPredictionPrix: any[];
  menuAdministration: any[];

  operateur : OperateurData;

  constructor(private authService: AuthService) {
    this.operateur = authService.operateur;
   }

  ngOnInit() {
    //initialisation des options dans les listes
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuTableauBord = TABLEAU_BORD.filter(menuItem => menuItem);
    this.menuParametreGlobale = PARAMETRE_GLOBALE.filter(menuItem => menuItem);
    this.menuParametres = PARAMETRE.filter(menuItem => menuItem);
    this.menuSaisieDonnees = SAISIE_DONNEES.filter(menuItem => menuItem);
    this.menuOffresDemande = OFFRES_DEMANDE.filter(menuItem => menuItem);
    this.menuValidation = VALIDATION.filter(menuItem => menuItem);
    this.menuPredictionPrix = PRESENTATION_PRIX.filter(menuItem => menuItem);
    this.menuAdministration = ADMINISTRATION.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  isAdmin(): Boolean{
    return this.authService.isAdmin();
  }
}
