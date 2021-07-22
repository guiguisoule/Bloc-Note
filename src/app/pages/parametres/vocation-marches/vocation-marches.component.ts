import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { MarcketVocationData } from './model-service/marketVocation.model';
import { VocationMarketService } from './model-service/vocation-market.service';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-vocation-marches',
  templateUrl: './vocation-marches.component.html',
  styleUrls: ['./vocation-marches.component.css']
})
export class VocationMarchesComponent implements AfterViewInit {
  displayedColumns: string[] = ['mktvocationid', 'Name_FR', 'Name_EN', 'Name_PT', 'star'];
  dataSource: MatTableDataSource<MarcketVocationData>;

  //creation d'un instance de vocationMarket connecte au formulaire d'ajout 
  vocationMarket: MarcketVocationData = new MarcketVocationData();

  //creation d'un instance de vocationMarket connecte au formulaire d'ajout 
  vocationMarketEdite: MarcketVocationData = new MarcketVocationData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vocationMarketService: VocationMarketService,
    private notificationService: NotificationsService) {
    // Create 100 vocationMarket
    // const vocationMarketData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des vocationMarket
    // this.chargerListMarcketVocation();

    this.vocationMarketService.getMarcketVocationList().subscribe(
      responce => {
        const vocationMarketData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(vocationMarketData);
      },
      error => {
        console.log(error);
        const vocationMarketData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(vocationMarketData);
      });

  }

  chargerListMarcketVocation(){
    this.vocationMarketService.getMarcketVocationList().subscribe(
      responce => {
        console.log(responce)
        const vocationMarketData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(vocationMarketData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const vocationMarketData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(vocationMarketData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.vocationMarketService.getMarcketVocation(this.vocationMarket.mktvocationid).subscribe(
      responce => {
        //Operation si le vocationMarket existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce vocationMarket exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau vocationMarket

        this.vocationMarketService.createMarcketVocation(this.vocationMarket).subscribe(
          responce => {
            console.log(responce)
            this.chargerListMarcketVocation();
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
     
     this.vocationMarketService.createMarcketVocation(this.vocationMarketEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListMarcketVocation();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idMarcketVocation : string){
    this.vocationMarketService.getMarcketVocation(idMarcketVocation).subscribe(
      responce => {
        this.vocationMarketEdite.mktvocationid = responce['mktvocationid'];
        this.vocationMarketEdite.Name_EN = responce['Name_EN'];
        this.vocationMarketEdite.Name_FR = responce['Name_FR'];
        this.vocationMarketEdite.Name_PT = responce['Name_PT'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteMarcketVocation(id : string){
    this.vocationMarketService.deleteMarcketVocation(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListMarcketVocation();
  }

  ngAfterViewInit() {
    this.chargerListMarcketVocation();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
