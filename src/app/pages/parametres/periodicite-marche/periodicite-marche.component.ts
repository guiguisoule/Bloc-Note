import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { PeriodiciteMarketService } from './model-service/periodicite-market.service';
import { PeriodiciteMarketData } from './model-service/periodiciteMarket.model';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-periodicite-marche',
  templateUrl: './periodicite-marche.component.html',
  styleUrls: ['./periodicite-marche.component.css']
})
export class PeriodiciteMarcheComponent implements AfterViewInit {
  displayedColumns: string[] = ['periodicityofmktId', 'Freguency', 'Name_FR', 'Name_EN', 'Name_PT', 'star'];
  dataSource: MatTableDataSource<PeriodiciteMarketData>;

  //creation d'un instance de periodiciteMarket connecte au formulaire d'ajout 
  periodiciteMarket: PeriodiciteMarketData = new PeriodiciteMarketData();

  //creation d'un instance de periodiciteMarket connecte au formulaire d'ajout 
  periodiciteMarketEdite: PeriodiciteMarketData = new PeriodiciteMarketData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private periodiciteMarketService: PeriodiciteMarketService,
    private notificationService: NotificationsService) {
    // Create 100 periodiciteMarket
    // const periodiciteMarketData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des periodiciteMarket
    // this.chargerListPeriodiciteMarket();

    this.periodiciteMarketService.getPeriodiciteMarketList().subscribe(
      responce => {
        const periodiciteMarketData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(periodiciteMarketData);
      },
      error => {
        console.log(error);
        const periodiciteMarketData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(periodiciteMarketData);
      });

  }

  chargerListPeriodiciteMarket(){
    this.periodiciteMarketService.getPeriodiciteMarketList().subscribe(
      responce => {
        console.log(responce)
        const periodiciteMarketData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(periodiciteMarketData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const periodiciteMarketData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(periodiciteMarketData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.periodiciteMarketService.getPeriodiciteMarket(this.periodiciteMarket.periodicityofmktId).subscribe(
      responce => {
        //Operation si le periodiciteMarket existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce periodiciteMarket exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau periodiciteMarket

        this.periodiciteMarketService.createPeriodiciteMarket(this.periodiciteMarket).subscribe(
          responce => {
            console.log(responce)
            this.chargerListPeriodiciteMarket();
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
     
     this.periodiciteMarketService.createPeriodiciteMarket(this.periodiciteMarketEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListPeriodiciteMarket();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idPeriodiciteMarket : string){
    this.periodiciteMarketService.getPeriodiciteMarket(idPeriodiciteMarket).subscribe(
      responce => {
        this.periodiciteMarketEdite.periodicityofmktId = responce['periodicityofmktId'];
        this.periodiciteMarketEdite.Name_EN = responce['Name_EN'];
        this.periodiciteMarketEdite.Name_FR = responce['Name_FR'];
        this.periodiciteMarketEdite.Name_PT = responce['Name_PT'];
        this.periodiciteMarketEdite.Freguency = responce['Freguency'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeletePeriodiciteMarket(id : string){
    this.periodiciteMarketService.deletePeriodiciteMarket(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListPeriodiciteMarket();
  }

  ngAfterViewInit() {
    this.chargerListPeriodiciteMarket();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}