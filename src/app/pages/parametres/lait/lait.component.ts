import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { LaitService } from './model-service/lait.service';
import { LaitData } from './model-service/oeuflait.model';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-lait',
  templateUrl: './lait.component.html',
  styleUrls: ['./lait.component.css']
})
export class LaitComponent implements AfterViewInit {
  displayedColumns: string[] = ['id_ol', 'libelle_ol', 'unite_ol' , 'star'];
  dataSource: MatTableDataSource<LaitData>;

  //creation d'un instance de animalType connecte au formulaire d'ajout 
  lait: LaitData = new LaitData();

  //creation d'un instance de animalType connecte au formulaire d'ajout 
  laitEdite: LaitData = new LaitData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private laitService: LaitService,
    private notificationService: NotificationsService) {
    // Create 100 animalType
    // const animalTypeData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des animalType
    // this.chargerListLait();

    this.laitService.getLaitList().subscribe(
      responce => {
        const laitData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(laitData);
      },
      error => {
        console.log(error);
        const laitData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(laitData);
      });

  }

  chargerListLait(){
    this.laitService.getLaitList().subscribe(
      responce => {
        // console.log(responce)
        const laitData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(laitData);

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

    this.laitService.getLait(this.lait.id_ol).subscribe(
      responce => {
        //Operation si le animalType existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce animalType exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau animalType

        this.laitService.createLait(this.lait).subscribe(
          responce => {
            // console.log(responce)
            this.chargerListLait();
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

     this.laitService.createLait(this.laitEdite).subscribe(
       responce => {
        //  console.log(responce)
         this.chargerListLait();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idLait : string){
    this.laitService.getLait(idLait).subscribe(
      responce => {

        this.laitEdite.id_ol = responce['id_ol'];
        this.laitEdite.libelle_ol = responce['libelle_ol'];
        this.laitEdite.unite_ol = responce['unite_ol'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteLait(id : string){
    this.laitService.deleteLait(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListLait();
  }

  ngAfterViewInit() {

    this.chargerListLait();  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}