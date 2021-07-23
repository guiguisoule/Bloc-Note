import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { InputTypeData } from './model-service/inputType.model';
import { TypeIntrantService } from './model-service/type-intrant.service';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-type-intrant',
  templateUrl: './type-intrant.component.html',
  styleUrls: ['./type-intrant.component.css']
})
export class TypeIntrantComponent implements AfterViewInit {
  displayedColumns: string[] = ['inputTypeID',  'Name_FR', 'Name_EN', 'Name_PT', 'isFertilizer', 'Active', 'star'];
  dataSource: MatTableDataSource<InputTypeData>;

  //creation d'un instance de inputType connecte au formulaire d'ajout 
  inputType: InputTypeData = new InputTypeData();

  //creation d'un instance de inputType connecte au formulaire d'ajout 
  inputTypeEdite: InputTypeData = new InputTypeData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private inputTypeService: TypeIntrantService,
    private notificationService: NotificationsService) {
    // Create 100 inputType
    // const inputTypeData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des inputType
    // this.chargerListInputType();

    this.inputTypeService.getInputTypeList().subscribe(
      responce => {
        const inputTypeData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(inputTypeData);
      },
      error => {
        console.log(error);
        const inputTypeData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(inputTypeData);
      });

  }

  chargerListInputType(){
    this.inputTypeService.getInputTypeList().subscribe(
      responce => {
        console.log(responce)
        const inputTypeData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(inputTypeData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const inputTypeData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(inputTypeData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.inputTypeService.getInputType(this.inputType.inputTypeID).subscribe(
      responce => {
        //Operation si le inputType existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce inputType exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau inputType

        this.inputTypeService.createInputType(this.inputType).subscribe(
          responce => {
            console.log(responce)
            this.chargerListInputType();
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
     
     this.inputTypeService.createInputType(this.inputTypeEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListInputType();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idInputType : string){
    this.inputTypeService.getInputType(idInputType).subscribe(
      responce => {
        this.inputTypeEdite.inputTypeID = responce['inputTypeID'];
        this.inputTypeEdite.Name_EN = responce['Name_EN'];
        this.inputTypeEdite.Name_FR = responce['Name_FR'];
        this.inputTypeEdite.Name_PT = responce['Name_PT'];
        this.inputTypeEdite.Active = responce['Active'];
        this.inputTypeEdite.isFertilizer = responce['isFertilizer'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteInputType(id : string){
    this.inputTypeService.deleteInputType(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListInputType();
  }

  ngAfterViewInit() {
    this.chargerListInputType();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}