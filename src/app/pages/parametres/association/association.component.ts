import { formatDate } from '@angular/common';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PaysData } from 'app/pages/parametreGlobeau/pays/model-service/pays.model';
import { PaysService } from 'app/pages/parametreGlobeau/pays/model-service/pays.service';
import { NotificationsService } from 'app/services/notifications.service';
import { AssociationData } from './model-service/association.model';
import { AssociationService } from './model-service/association.service';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements AfterViewInit {
  displayedColumns: string[] = ['id_assoc', 'cigle', 'nom_assoc', 'responsable','telephone', 'email', 'codepays', 'opcre', 'opmaj', 'datecre', 'datemaj', 'star'];
  dataSource: MatTableDataSource<AssociationData>;

  //creation d'un instance de association connecte au formulaire d'ajout 
  association: AssociationData = new AssociationData();

  //creation d'un instance de association connecte au formulaire d'ajout 
  associationEdite: AssociationData = new AssociationData();

  paysList: PaysData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private associationService: AssociationService,
    private paysService: PaysService,
    private notificationService: NotificationsService) {
    // Create 100 association
    // const associationData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des association
    this.chargerListAssociation();

    // this.associationService.getAssociationList().subscribe(
    //   responce => {
    //     const associationData = responce;
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(associationData);
    //   },
    //   error => {
    //     console.log(error);
    //     const associationData = [];
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(associationData);
    //   });

  }

  chargerListAssociation(){
    this.associationService.getAssociationList().subscribe(
      responce => {
        console.log(responce)
        const associationData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(associationData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const associationData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(associationData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

    this.associationService.getAssociation(this.association.id_assoc).subscribe(
      responce => {
        //Operation si le association existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce association exist deja !<br>Merci de changer les id_assocentifients');
      },
      error => {
        //Enregistrement du nouveau association
        this.associationEdite.datemaj = "t";
        this.associationEdite.datecre = "t";
        this.associationService.createAssociation(this.association).subscribe(
          responce => {
            console.log(responce)
            this.chargerListePays();
            this.chargerListAssociation();
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

    this.associationEdite.datemaj = "t";
     this.associationService.createAssociation(this.associationEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListePays();
         this.chargerListAssociation();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(id_assocAssociation : string){
    this.associationService.getAssociation(id_assocAssociation).subscribe(
      responce => {
        this.associationEdite.id_assoc = responce['id_assoc'];
        this.associationEdite.cigle = responce['cigle'];
        this.associationEdite.codepays = responce['codepays'];
        this.associationEdite.datecre = responce['datecre'];
        this.associationEdite.datemaj = responce['datemaj'];
        this.associationEdite.email = responce['email'];
        this.associationEdite.opmaj = responce['opmaj'];
        this.associationEdite.nom_assoc = responce['nom_assoc'];
        this.associationEdite.opcre = responce['opcre'];
        this.associationEdite.responsable = responce['responsable'];
        this.associationEdite.telephone = responce['telephone'];

        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteAssociation(id_assoc : string){
    this.associationService.deleteAssociation(id_assoc).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListePays();
      this.chargerListAssociation();
  }

  ngAfterViewInit() {
    this.chargerListePays();
    this.chargerListAssociation();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
