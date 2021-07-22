import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { PeriodiciteEnquetteService } from './model-service/periodicite-enquette.service';
import { PeriodiciteEnquetteData } from './model-service/periodiciteEnquetteur.model';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-periodicite-enquettes',
  templateUrl: './periodicite-enquettes.component.html',
  styleUrls: ['./periodicite-enquettes.component.css']
})
export class PeriodiciteEnquettesComponent implements AfterViewInit {
  displayedColumns: string[] = ['periodicityofsurveyId', 'Freguency', 'Name_FR', 'Name_EN', 'Name_PT', 'star'];
  dataSource: MatTableDataSource<PeriodiciteEnquetteData>;

  //creation d'un instance de periodiciteEnquette connecte au formulaire d'ajout 
  periodiciteEnquette: PeriodiciteEnquetteData = new PeriodiciteEnquetteData();

  //creation d'un instance de periodiciteEnquette connecte au formulaire d'ajout 
  periodiciteEnquetteEdite: PeriodiciteEnquetteData = new PeriodiciteEnquetteData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private periodiciteEnquetteService: PeriodiciteEnquetteService,
    private notificationService: NotificationsService) {
    // Create 100 periodiciteEnquette
    // const periodiciteEnquetteData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des periodiciteEnquette
    // this.chargerListPeriodiciteEnquette();

    this.periodiciteEnquetteService.getPeriodiciteEnquetteList().subscribe(
      responce => {
        const periodiciteEnquetteData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(periodiciteEnquetteData);
      },
      error => {
        console.log(error);
        const periodiciteEnquetteData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(periodiciteEnquetteData);
      });

  }

  chargerListPeriodiciteEnquette(){
    this.periodiciteEnquetteService.getPeriodiciteEnquetteList().subscribe(
      responce => {
        console.log(responce)
        const periodiciteEnquetteData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(periodiciteEnquetteData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const periodiciteEnquetteData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(periodiciteEnquetteData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.periodiciteEnquetteService.getPeriodiciteEnquette(this.periodiciteEnquette.periodicityofsurveyId).subscribe(
      responce => {
        //Operation si le periodiciteEnquette existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce periodiciteEnquette exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau periodiciteEnquette

        this.periodiciteEnquetteService.createPeriodiciteEnquette(this.periodiciteEnquette).subscribe(
          responce => {
            console.log(responce)
            this.chargerListPeriodiciteEnquette();
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
     
     this.periodiciteEnquetteService.createPeriodiciteEnquette(this.periodiciteEnquetteEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListPeriodiciteEnquette();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idPeriodiciteEnquette : string){
    this.periodiciteEnquetteService.getPeriodiciteEnquette(idPeriodiciteEnquette).subscribe(
      responce => {
        this.periodiciteEnquetteEdite.periodicityofsurveyId = responce['periodicityofsurveyId'];
        this.periodiciteEnquetteEdite.Name_EN = responce['Name_EN'];
        this.periodiciteEnquetteEdite.Name_FR = responce['Name_FR'];
        this.periodiciteEnquetteEdite.Name_PT = responce['Name_PT'];
        this.periodiciteEnquetteEdite.Freguency = responce['Freguency'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeletePeriodiciteEnquette(id : string){
    this.periodiciteEnquetteService.deletePeriodiciteEnquette(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListPeriodiciteEnquette();
  }

  ngAfterViewInit() {
    this.chargerListPeriodiciteEnquette();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}