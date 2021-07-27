import { formatDate } from '@angular/common';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PaysData } from 'app/pages/parametreGlobeau/pays/model-service/pays.model';
import { PaysService } from 'app/pages/parametreGlobeau/pays/model-service/pays.service';
import { NotificationsService } from 'app/services/notifications.service';
import { AssociationData } from '../association/model-service/association.model';
import { AssociationService } from '../association/model-service/association.service';
import { ActeurData } from './model-service/acteur.model';
import { ActeurService } from './model-service/acteur.service';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-acteurs',
  templateUrl: './acteurs.component.html',
  styleUrls: ['./acteurs.component.css']
})
export class ActeursComponent implements AfterViewInit {
  displayedColumns: string[] = ['id_acteur', 'sim_type', 'nomacteur', 'prenom_acteur', 'sexe',  'nationalite', 'tel_acteur', 'phone2','phone3', 'coordx', 'coordy', 'id_assoc', 'star'];
  dataSource: MatTableDataSource<ActeurData>;

  //creation d'un instance de acteur connecte au formulaire d'ajout 
  acteur: ActeurData = new ActeurData();

  //creation d'un instance de acteur connecte au formulaire d'ajout 
  acteurEdite: ActeurData = new ActeurData();

  //liste des association
  associationList: AssociationData[];

  //liste des pays
  paysList: PaysData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private acteurService: ActeurService,
    private associationService: AssociationService,
    private paysService: PaysService,
    private notificationService: NotificationsService) {
    // Create 100 acteur
    // const acteurData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des acteur
    // this.chargerListActeur();

    // this.acteurService.getActeurList().subscribe(
    //   responce => {
    //     const acteurData = responce;
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(acteurData);
    //   },
    //   error => {
    //     console.log(error);
    //     const acteurData = [];
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(acteurData);
    //   });

  }

  chargerListActeur(){
    this.acteurService.getActeurList().subscribe(
      responce => {
        console.log(responce)
        const acteurData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(acteurData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const acteurData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(acteurData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  chargerListeAssociation(){
    this.associationService.getAssociationList().subscribe(
     responce => {
       console.log(responce)
       this.associationList = responce;
       
     },
     error => {
       console.log(error);
     });
    
   }

   chargerListePays(){
    this.paysService.getPaysList().subscribe(
     responce => {
       console.log(responce)
       this.paysList = responce;
       
     },
     error => {
       console.log(error);
     });
    
   }

  onSave(){

    this.acteurService.getActeur(this.acteur.id_acteur).subscribe(
      responce => {
        //Operation si le acteur existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce acteur exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau acteur
        //initialisation des date par defaut par defaut
        this.acteur.datecre = new Date('yyyy-MM-dd').toString(); ;
        this.acteur.datemaj = new Date('yyyy-MM-dd').toString() ;
        
        this.acteurService.createActeur(this.acteur).subscribe(
          responce => {
            console.log(responce)
            this.chargerListActeur();
            this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
          },
          error => {
            console.log(error);
            this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
          }
        );
        
      });

   
  }

  onSaveEdite(){
     //initialisation des date par defaut par defaut
     this.acteur.datemaj = new Date('yyyy-MM-dd').toString();

     this.acteurService.createActeur(this.acteurEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListActeur();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idActeur : string){
    this.acteurService.getActeur(idActeur).subscribe(
      responce => {
        this.acteurEdite.coordx = responce['coordx'];
        this.acteurEdite.coordy = responce['coordy'];
        this.acteurEdite.datecre = responce['datecre'];
        this.acteurEdite.datemaj = responce['datemaj'];
        this.acteurEdite.email_acteur = responce['email_acteur'];
        this.acteurEdite.id_acteur = responce['id_acteur'];
        this.acteurEdite.id_assoc = responce['id_assoc'];
        this.acteurEdite.nationalite = responce['nationalite'];
        this.acteurEdite.nomacteur = responce['nomacteur'];
        this.acteurEdite.opcre = responce['opcre'];
        this.acteurEdite.opmaj = responce['opmaj'];
        this.acteurEdite.phone2 = responce['phone2'];
        this.acteurEdite.phone3 = responce['phone3'];
        this.acteurEdite.prenom_acteur = responce['prenom_acteur'];
        this.acteurEdite.sexe = responce['sexe'];
        this.acteurEdite.sim_type = responce['sim_type'];
        this.acteurEdite.tel_acteur = responce['tel_acteur'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteActeur(id : string){
    this.acteurService.deleteActeur(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListActeur();
  }

  ngAfterViewInit() {
    this.chargerListeAssociation();
    this.chargerListePays();
    this.chargerListActeur();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
