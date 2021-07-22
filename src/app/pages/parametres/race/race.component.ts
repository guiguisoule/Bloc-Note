import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { AnimalTypeData } from '../animal/animal-type/model-service/animal-type.model';
import { AnimalTypeService } from '../animal/animal-type/model-service/animal-type.service';
import { RaceData } from './model-service/race.model';
import { RaceService } from './model-service/race.service';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements AfterViewInit {
  displayedColumns: string[] = ['id_race', 'AnimalTypeID', 'libelle_race' , 'star'];
  dataSource: MatTableDataSource<RaceData>;

  //creation d'un instance de animalType connecte au formulaire d'ajout 
  race: RaceData = new RaceData();

  //creation d'un instance de animalType connecte au formulaire d'ajout 
  raceEdite: RaceData = new RaceData();

  animalTypeList: AnimalTypeData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private raceService: RaceService,
    private animalTypeService: AnimalTypeService,
    private notificationService: NotificationsService) {
    // Create 100 animalType
    // const animalTypeData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des animalType
    // this.chargerListRace();

    this.raceService.getRaceList().subscribe(
      responce => {
        const raceData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(raceData);
      },
      error => {
        console.log(error);
        const raceData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(raceData);
      });

  }

  chargerListRace(){
    this.raceService.getRaceList().subscribe(
      responce => {
        // console.log(responce)
        const raceData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(raceData);

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

  chargerListeAnimalType(){
    this.animalTypeService.getAnimalTypeList().subscribe(
     responce => {
      //  console.log(responce)
       this.animalTypeList = responce;
     },
     error => {
       console.log(error);
     });
    
   }

  onSave(){

    this.raceService.getRace(this.race.id_race).subscribe(
      responce => {
        //Operation si le animalType existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce animalType exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau animalType

        this.raceService.createRace(this.race).subscribe(
          responce => {
            // console.log(responce)
            this.chargerListeAnimalType();
            this.chargerListRace();
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

     this.raceService.createRace(this.raceEdite).subscribe(
       responce => {
        //  console.log(responce)
         this.chargerListeAnimalType();
         this.chargerListRace();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idRace : string){
    this.raceService.getRace(idRace).subscribe(
      responce => {

        this.chargerListeAnimalType();

        this.raceEdite.id_race = responce['id_race'];
        this.raceEdite.AnimalTypeID = responce['AnimalTypeID'];
        this.raceEdite.libelle_race = responce['libelle_race'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteRace(id : string){
    this.raceService.deleteRace(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListRace();
      this.chargerListeAnimalType();
  }

  ngAfterViewInit() {

    this.chargerListRace();  
    this.chargerListeAnimalType();  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}