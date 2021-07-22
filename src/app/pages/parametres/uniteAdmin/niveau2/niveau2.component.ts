import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { Niveau1Data } from '../niveau1/model-service/admin_niv1.model';
import { Niveau1Service } from '../niveau1/model-service/niveau1.service';
import { Niveau2Data } from './model-service/admin_niv2.model';
import { Niveau2Service } from './model-service/niveau2.service';

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
  selector: 'app-niveau2',
  templateUrl: './niveau2.component.html',
  styleUrls: ['./niveau2.component.css']
})
export class Niveau2Component implements AfterViewInit {
  displayedColumns: string[] = ['id_al2', 'libelle_al2' , 'id_al1', 'star'];
  dataSource: MatTableDataSource<Niveau2Data>;

  //creation d'un instance de niveau1 connecte au formulaire d'ajout 
  niveau2: Niveau2Data = new Niveau2Data();

  //creation d'un instance de niveau1 connecte au formulaire d'ajout 
  niveau2Edite: Niveau2Data = new Niveau2Data();

  niveau1List: Niveau1Data[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private niveau2Service: Niveau2Service,
    private niveau1Service: Niveau1Service,
    private notificationService: NotificationsService) {
    // Create 100 niveau1
    // const niveau1Data = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des niveau1
    // this.chargerListNiveau2();

    this.niveau2Service.getNiveau2List().subscribe(
      responce => {
        const niveau1Data = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(niveau1Data);
      },
      error => {
        console.log(error);
        const niveau1Data = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(niveau1Data);
      });

  }

  chargerListNiveau2(){
    this.niveau2Service.getNiveau2List().subscribe(
      responce => {
        // console.log(responce)
        const niveau1Data = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(niveau1Data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error => {
        console.log(error);
        const niveau1Data = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(niveau1Data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  chargerListeNiveau1(){
    this.niveau1Service.getNiveau1List().subscribe(
     responce => {
      //  console.log(responce)
       this.niveau1List = responce;
     },
     error => {
       console.log(error);
     });
    
   }

  onSave(){

    this.niveau2Service.getNiveau2(this.niveau2.id_al2).subscribe(
      responce => {
        //Operation si le niveau1 existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce niveau1 exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau niveau1

        this.niveau2Service.createNiveau2(this.niveau2).subscribe(
          responce => {
            // console.log(responce)
            this.chargerListeNiveau1();
            this.chargerListNiveau2();
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

     this.niveau2Service.createNiveau2(this.niveau2Edite).subscribe(
       responce => {
        //  console.log(responce)
         this.chargerListeNiveau1();
         this.chargerListNiveau2();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idNiveau2 : string){
    this.niveau2Service.getNiveau2(idNiveau2).subscribe(
      responce => {

        this.chargerListeNiveau1();

        this.niveau2Edite.id_al2 = responce['id_al2'];
        this.niveau2Edite.id_al1 = responce['id_al1'];
        this.niveau2Edite.libelle_al2 = responce['libelle_al2'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteNiveau2(id : string){
    this.niveau2Service.deleteNiveau2(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListNiveau2();
      this.chargerListeNiveau1();
  }

  ngAfterViewInit() {

    this.chargerListNiveau2();  
    this.chargerListeNiveau1();  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}