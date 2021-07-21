import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { Observable } from 'rxjs';
import { AnimalTypeData } from '../animal-type/model-service/animal-type.model';
import { AnimalTypeService } from '../animal-type/model-service/animal-type.service';
import { AnimalData } from './model-service/animal.model';
import { AnimalService } from './model-service/animal.service';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements AfterViewInit {
  displayedColumns: string[] = ['animalid', 'animaltypeid', 'gender', 'age','min', 'max', 'racefr', 'race_en', 'race_pt', 'race_al', 'race_di', 'race_ga', 'race_go','race_ha', 'race_je', 'race_ma', 'race_mo', 'race_pu', 'race_wo', 'active', 'star'];
  dataSource: MatTableDataSource<AnimalData>;

  //creation d'un instance de animal connecte au formulaire d'ajout 
  animal: AnimalData = new AnimalData();

  //creation d'un instance de animal connecte au formulaire d'ajout 
  animalEdite: AnimalData = new AnimalData();

  animalTypeList: AnimalTypeData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private animalService: AnimalService,
    private animalTypeService: AnimalTypeService,
    private notificationService: NotificationsService) {
    // Create 100 animal
    // const animalData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des animal
    // this.chargerListAnimal();

    // this.animalService.getAnimalList().subscribe(
    //   responce => {
    //     const animalData = responce;
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(animalData);
    //   },
    //   error => {
    //     console.log(error);
    //     const animalData = [];
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(animalData);
    //   });

  }

  chargerListAnimal(){
    this.animalService.getAnimalList().subscribe(
      responce => {
        console.log(responce)
        const animalData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(animalData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const animalData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(animalData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  chargerListeAnimalType(){
   this.animalTypeService.getAnimalTypeList().subscribe(
    responce => {
      console.log(responce)
      this.animalTypeList = responce;
      
    },
    error => {
      console.log(error);
    });
   
  }

  onSave(){

    this.animalService.getAnimal(this.animal.animalid).subscribe(
      responce => {
        //Operation si le animal existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce animal exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau animal
        //initialisation de active par defaut
        this.animal.active = 1;
        this.animalEdite.dates = "default";
        this.animalEdite.imagepath = "default";

        this.animalService.createAnimal(this.animal).subscribe(
          responce => {
            console.log(responce)
            this.chargerListeAnimalType();
            this.chargerListAnimal();
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
     this.animal.active = 1;
     this.animalEdite.dates = "default";
     this.animalEdite.imagepath = "default";

     this.animalService.createAnimal(this.animalEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListeAnimalType();
         this.chargerListAnimal();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idAnimal : string){
    this.animalService.getAnimal(idAnimal).subscribe(
      responce => {
        this.animalEdite.animalid = responce['animalid'];
        this.animalEdite.animaltypeid = responce['animaltypeid'];
        this.animalEdite.conformations_en = responce['conformations_en'];
        this.animalEdite.conformations_fr = responce['conformations_fr'];
        this.animalEdite.conformations_pt = responce['conformations_pt'];
        this.animalEdite.dates = responce['dates'];
        this.animalEdite.gender = responce['gender'];
        this.animalEdite.imagepath = responce['imagepath'];
        this.animalEdite.age = responce['age'];
        this.animalEdite.max = responce['max'];
        this.animalEdite.min = responce['min'];
        this.animalEdite.race_al = responce['race_al'];
        this.animalEdite.race_di = responce['race_di'];
        this.animalEdite.race_en = responce['race_en'];
        this.animalEdite.race_ga = responce['race_ga'];
        this.animalEdite.race_go = responce['race_go'];
        this.animalEdite.race_ha = responce['race_ha'];
        this.animalEdite.race_je = responce['race_je'];
        this.animalEdite.race_ma = responce['race_ma'];
        this.animalEdite.race_mo = responce['race_mo'];
        this.animalEdite.race_pt = responce['race_pt'];
        this.animalEdite.race_pu = responce['race_pu'];
        this.animalEdite.race_wo = responce['race_wo'];
        this.animalEdite.racefr = responce['racefr'];

        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteAnimal(id : string){
    this.animalService.deleteAnimal(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListeAnimalType();
      this.chargerListAnimal();
  }

  ngAfterViewInit() {
    this.chargerListeAnimalType();
    this.chargerListAnimal();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
