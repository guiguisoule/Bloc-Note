import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { UniteMesureService } from './model-service/unite-mesure.service';
import { UniteMesureData } from './model-service/unite.model';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-unite-mesure',
  templateUrl: './unite-mesure.component.html',
  styleUrls: ['./unite-mesure.component.css']
})
export class UniteMesureComponent implements AfterViewInit {
  displayedColumns: string[] = ['unitid', 'name_FR', 'name_EN', 'name_PT','type', 'addrev', 'dates','star'];
  dataSource: MatTableDataSource<UniteMesureData>;

  //creation d'un instance de uniteMesure connecte au formulaire d'ajout 
  uniteMesure: UniteMesureData = new UniteMesureData();

  //creation d'un instance de uniteMesure connecte au formulaire d'ajout 
  uniteMesureEdite: UniteMesureData = new UniteMesureData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private uniteMesureService: UniteMesureService,
    private notificationService: NotificationsService) {
    // Create 100 uniteMesure
    // const uniteMesureData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des uniteMesure
    // this.chargerListUniteMesure();

    this.uniteMesureService.getUniteMesureList().subscribe(
      responce => {
        const uniteMesureData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(uniteMesureData);
      },
      error => {
        console.log(error);
        const uniteMesureData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(uniteMesureData);
      });

  }

  chargerListUniteMesure(){
    this.uniteMesureService.getUniteMesureList().subscribe(
      responce => {
        console.log(responce)
        const uniteMesureData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(uniteMesureData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const uniteMesureData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(uniteMesureData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.uniteMesureService.getUniteMesure(this.uniteMesure.unitid).subscribe(
      responce => {
        //Operation si le uniteMesure existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce uniteMesure exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau uniteMesure

        this.uniteMesureService.createUniteMesure(this.uniteMesure).subscribe(
          responce => {
            console.log(responce)
            this.chargerListUniteMesure();
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
     
     this.uniteMesureService.createUniteMesure(this.uniteMesureEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListUniteMesure();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idUniteMesure : string){
    this.uniteMesureService.getUniteMesure(idUniteMesure).subscribe(
      responce => {
        this.uniteMesureEdite.unitid = responce['unitid'];
        this.uniteMesureEdite.name_EN = responce['name_EN'];
        this.uniteMesureEdite.name_FR = responce['name_FR'];
        this.uniteMesureEdite.name_PT = responce['name_PT'];
        this.uniteMesureEdite.addrev = responce['addrev'];
        this.uniteMesureEdite.dates = responce['dates'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteUniteMesure(id : string){
    this.uniteMesureService.deleteUniteMesure(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListUniteMesure();
  }

  ngAfterViewInit() {
    this.chargerListUniteMesure();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}