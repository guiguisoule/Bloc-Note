import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { SecteursData } from './model-service/secteurs.model';
import { SecteursService } from './model-service/secteurs.service';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-secteur-activite',
  templateUrl: './secteur-activite.component.html',
  styleUrls: ['./secteur-activite.component.css']
})
export class SecteurActiviteComponent implements AfterViewInit {
  displayedColumns: string[] = ['sectorid',  'Name_FR', 'Name_EN', 'Name_PT', 'dates', 'star'];
  dataSource: MatTableDataSource<SecteursData>;

  //creation d'un instance de secteurs connecte au formulaire d'ajout 
  secteurs: SecteursData = new SecteursData();

  //creation d'un instance de secteurs connecte au formulaire d'ajout 
  secteursEdite: SecteursData = new SecteursData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private secteursService: SecteursService,
    private notificationService: NotificationsService) {
    // Create 100 secteurs
    // const secteursData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des secteurs
    // this.chargerListSecteurs();

    this.secteursService.getSecteursList().subscribe(
      responce => {
        const secteursData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(secteursData);
      },
      error => {
        console.log(error);
        const secteursData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(secteursData);
      });

  }

  chargerListSecteurs(){
    this.secteursService.getSecteursList().subscribe(
      responce => {
        console.log(responce)
        const secteursData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(secteursData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const secteursData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(secteursData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.secteursService.getSecteurs(this.secteurs.sectorid).subscribe(
      responce => {
        //Operation si le secteurs existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce secteurs exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau secteurs

        this.secteursService.createSecteurs(this.secteurs).subscribe(
          responce => {
            console.log(responce)
            this.chargerListSecteurs();
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
     //initialisation de dans_ci par defaut
     
     this.secteursService.createSecteurs(this.secteursEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListSecteurs();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idSecteurs : string){
    this.secteursService.getSecteurs(idSecteurs).subscribe(
      responce => {
        this.secteursEdite.sectorid = responce['sectorid'];
        this.secteursEdite.Name_EN = responce['Name_EN'];
        this.secteursEdite.Name_FR = responce['Name_FR'];
        this.secteursEdite.Name_PT = responce['Name_PT'];
        this.secteursEdite.dates = responce['dates'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteSecteurs(id : string){
    this.secteursService.deleteSecteurs(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListSecteurs();
  }

  ngAfterViewInit() {
    this.chargerListSecteurs();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}