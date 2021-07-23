import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { InputTypeData } from '../type-intrant/model-service/inputType.model';
import { TypeIntrantService } from '../type-intrant/model-service/type-intrant.service';
import { UniteMesureService } from '../unite-mesure/model-service/unite-mesure.service';
import { UniteMesureData } from '../unite-mesure/model-service/unite.model';
import { InputsData } from './model-service/input.model';
import { IntrantService } from './model-service/intrant.service';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-intrant',
  templateUrl: './intrant.component.html',
  styleUrls: ['./intrant.component.css']
})
export class IntrantComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'inputtypeid', 'namefr', 'nameen','namept', 'unit', 'active', 'dates', 'star'];
  dataSource: MatTableDataSource<InputsData>;

  //creation d'un instance de input connecte au formulaire d'ajout 
  inputs: InputsData = new InputsData();

  //creation d'un instance de input connecte au formulaire d'ajout 
  inputEdite: InputsData = new InputsData();

  inputTypeList: InputTypeData[];

  uniteList: UniteMesureData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private inputService: IntrantService,
    private inputTypeService: TypeIntrantService,
    private unitService: UniteMesureService,
    private notificationService: NotificationsService) {
    // Create 100 input
    // const inputData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des input
    // this.chargerListInput();

    // this.inputService.getInputList().subscribe(
    //   responce => {
    //     const inputData = responce;
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(inputData);
    //   },
    //   error => {
    //     console.log(error);
    //     const inputData = [];
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(inputData);
    //   });

  }

  chargerListInput(){
    this.inputService.getInputList().subscribe(
      responce => {
        console.log(responce)
        const inputData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(inputData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const inputData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(inputData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  chargerListeInputType(){
   this.inputTypeService.getInputTypeList().subscribe(
    responce => {
      console.log(responce)
      this.inputTypeList = responce;
      
    },
    error => {
      console.log(error);
    });
   
  }

  chargerListeUnit(){
    this.unitService.getUniteMesureList().subscribe(
     responce => {
       console.log(responce)
       this.uniteList = responce;
       
     },
     error => {
       console.log(error);
     });
    
   }

  onSave(){

    this.inputService.getInput(this.inputs.id).subscribe(
      responce => {
        //Operation si le input existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce input exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau input
        //initialisation de active par defaut
        this.inputEdite.active = 1;
        this.inputEdite.dates = "default";
        this.inputEdite.imagepath = "default";

        this.inputService.createInput(this.inputs).subscribe(
          responce => {
            console.log(responce)
            this.chargerListeInputType();
            this.chargerListInput();
            this.chargerListeUnit();
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
     this.inputEdite.active = 1;
     this.inputEdite.dates = "default";
     this.inputEdite.imagepath = "default";

     this.inputService.createInput(this.inputEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListeInputType();
         this.chargerListInput();
         this.chargerListeUnit();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idInput : string){
    this.inputService.getInput(idInput).subscribe(
      responce => {
        this.inputEdite.id = responce['id'];
        this.inputEdite.inputtypeid = responce['inputtypeid'];
        this.inputEdite.namefr = responce['namefr'];
        this.inputEdite.nameen = responce['nameen'];
        this.inputEdite.namept = responce['namept'];
        this.inputEdite.dates = responce['dates'];
        this.inputEdite.imagepath = responce['imagepath'];
        this.inputEdite.active = responce['active'];

        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteInput(id : string){
    this.inputService.deleteInput(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListeInputType();
      this.chargerListInput();
      this.chargerListeUnit();
  }

  ngAfterViewInit() {
    this.chargerListeInputType();
    this.chargerListInput();    
    this.chargerListeUnit();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
