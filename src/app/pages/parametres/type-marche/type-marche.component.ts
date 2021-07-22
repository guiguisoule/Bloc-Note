import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { MarcketTypeData } from './model-service/market-type.model';
import { TypeMarcheService } from './model-service/type-marche.service';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-type-marche',
  templateUrl: './type-marche.component.html',
  styleUrls: ['./type-marche.component.css']
})
export class TypeMarcheComponent implements AfterViewInit {
  displayedColumns: string[] = ['MarketTypeID', 'Name_FR', 'Name_EN', 'Name_PT', 'star'];
  dataSource: MatTableDataSource<MarcketTypeData>;

  //creation d'un instance de marcketType connecte au formulaire d'ajout 
  marcketType: MarcketTypeData = new MarcketTypeData();

  //creation d'un instance de marcketType connecte au formulaire d'ajout 
  marcketTypeEdite: MarcketTypeData = new MarcketTypeData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private marcketTypeService: TypeMarcheService,
    private notificationService: NotificationsService) {
    // Create 100 marcketType
    // const marcketTypeData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des marcketType
    // this.chargerListMarcketType();

    this.marcketTypeService.getMarcketTypeList().subscribe(
      responce => {
        const marcketTypeData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(marcketTypeData);
      },
      error => {
        console.log(error);
        const marcketTypeData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(marcketTypeData);
      });

  }

  chargerListMarcketType(){
    this.marcketTypeService.getMarcketTypeList().subscribe(
      responce => {
        console.log(responce)
        const marcketTypeData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(marcketTypeData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const marcketTypeData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(marcketTypeData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.marcketTypeService.getMarcketType(this.marcketType.MarketTypeID).subscribe(
      responce => {
        //Operation si le marcketType existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce marcketType exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau marcketType

        this.marcketTypeService.createMarcketType(this.marcketType).subscribe(
          responce => {
            console.log(responce)
            this.chargerListMarcketType();
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
     
     this.marcketTypeService.createMarcketType(this.marcketTypeEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListMarcketType();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idMarcketType : string){
    this.marcketTypeService.getMarcketType(idMarcketType).subscribe(
      responce => {
        this.marcketTypeEdite.MarketTypeID = responce['MarketTypeID'];
        this.marcketTypeEdite.Name_EN = responce['Name_EN'];
        this.marcketTypeEdite.Name_FR = responce['Name_FR'];
        this.marcketTypeEdite.Name_PT = responce['Name_PT'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteMarcketType(id : string){
    this.marcketTypeService.deleteMarcketType(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListMarcketType();
  }

  ngAfterViewInit() {
    this.chargerListMarcketType();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
