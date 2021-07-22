import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PaysData } from 'app/pages/parametreGlobeau/pays/model-service/pays.model';
import { PaysService } from 'app/pages/parametreGlobeau/pays/model-service/pays.service';
import { NotificationsService } from 'app/services/notifications.service';
import { AnimalTypeData } from './model-service/animal-type.model';
import { AnimalTypeService } from './model-service/animal-type.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-animal-type',
  templateUrl: './animal-type.component.html',
  styleUrls: ['./animal-type.component.css']
})
export class AnimalTypeComponent implements AfterViewInit {
  displayedColumns: string[] = ['animaltypeid', 'name_FR', 'name_EN', 'name_PT','active', 'star'];
  dataSource: MatTableDataSource<AnimalTypeData>;

  //creation d'un instance de animalType connecte au formulaire d'ajout 
  animalType: AnimalTypeData = new AnimalTypeData();

  //creation d'un instance de animalType connecte au formulaire d'ajout 
  animalTypeEdite: AnimalTypeData = new AnimalTypeData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private animalTypeService: AnimalTypeService,
    private notificationService: NotificationsService) {
    // Create 100 animalType
    // const animalTypeData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des animalType
    // this.chargerListAnimalType();

    this.animalTypeService.getAnimalTypeList().subscribe(
      responce => {
        const animalTypeData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(animalTypeData);
      },
      error => {
        console.log(error);
        const animalTypeData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(animalTypeData);
      });

  }

  chargerListAnimalType(){
    this.animalTypeService.getAnimalTypeList().subscribe(
      responce => {
        console.log(responce)
        const animalTypeData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(animalTypeData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const animalTypeData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(animalTypeData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.animalTypeService.getAnimalType(this.animalType.animaltypeid).subscribe(
      responce => {
        //Operation si le animalType existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce animalType exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau animalType

        this.animalTypeService.createAnimalType(this.animalType).subscribe(
          responce => {
            console.log(responce)
            this.chargerListAnimalType();
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
     
     this.animalTypeService.createAnimalType(this.animalTypeEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListAnimalType();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idAnimalType : string){
    this.animalTypeService.getAnimalType(idAnimalType).subscribe(
      responce => {
        this.animalTypeEdite.animaltypeid = responce['animaltypeid'];
        this.animalTypeEdite.name_EN = responce['name_EN'];
        this.animalTypeEdite.name_FR = responce['name_FR'];
        this.animalTypeEdite.name_PT = responce['name_PT'];
        this.animalTypeEdite.active = responce['active'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteAnimalType(id : string){
    this.animalTypeService.deleteAnimalType(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListAnimalType();
  }

  ngAfterViewInit() {
    this.chargerListAnimalType();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}