import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { Niveau2Data } from '../niveau2/model-service/admin_niv2.model';
import { Niveau2Service } from '../niveau2/model-service/niveau2.service';
import { Niveau3Data } from './model-service/niveau3.model';
import { Niveau3Service } from './model-service/niveau3.service';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-niveau3',
  templateUrl: './niveau3.component.html',
  styleUrls: ['./niveau3.component.css']
})
export class Niveau3Component implements AfterViewInit {
  displayedColumns: string[] = ['id_al3', 'libelle_al3' , 'id_al2', 'star'];
  dataSource: MatTableDataSource<Niveau3Data>;

  //creation d'un instance de niveau2 connecte au formulaire d'ajout 
  niveau3: Niveau3Data = new Niveau3Data();

  //creation d'un instance de niveau2 connecte au formulaire d'ajout 
  niveau3Edite: Niveau3Data = new Niveau3Data();

  niveau2List: Niveau2Data[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private niveau3Service: Niveau3Service,
    private niveau2Service: Niveau2Service,
    private notificationService: NotificationsService) {
    // Create 200 niveau2
    // const niveau2Data = Array.from({length: 200}, (_, k) => createNewUser(k + 2));

    //chargement de la liste des niveau2
    // this.chargerListNiveau3();

    this.niveau3Service.getNiveau3List().subscribe(
      responce => {
        const niveau2Data = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(niveau2Data);
      },
      error => {
        console.log(error);
        const niveau2Data = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(niveau2Data);
      });

  }

  chargerListNiveau3(){
    this.niveau3Service.getNiveau3List().subscribe(
      responce => {
        // console.log(responce)
        const niveau2Data = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(niveau2Data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error => {
        console.log(error);
        const niveau2Data = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(niveau2Data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  chargerListeNiveau2(){
    this.niveau2Service.getNiveau2List().subscribe(
     responce => {
      //  console.log(responce)
       this.niveau2List = responce;
     },
     error => {
       console.log(error);
     });
    
   }

  onSave(){

    this.niveau3Service.getNiveau3(this.niveau3.id_al3).subscribe(
      responce => {
        //Operation si le niveau2 existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce niveau2 exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau niveau2

        this.niveau3Service.createNiveau3(this.niveau3).subscribe(
          responce => {
            // console.log(responce)
            this.chargerListeNiveau2();
            this.chargerListNiveau3();
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

     this.niveau3Service.createNiveau3(this.niveau3Edite).subscribe(
       responce => {
        //  console.log(responce)
         this.chargerListeNiveau2();
         this.chargerListNiveau3();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idNiveau3 : string){
    this.niveau3Service.getNiveau3(idNiveau3).subscribe(
      responce => {

        this.chargerListeNiveau2();

        this.niveau3Edite.id_al3 = responce['id_al3'];
        this.niveau3Edite.id_al2 = responce['id_al2'];
        this.niveau3Edite.libelle_al3 = responce['libelle_al3'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteNiveau3(id : string){
    this.niveau3Service.deleteNiveau3(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListNiveau3();
      this.chargerListeNiveau2();
  }

  ngAfterViewInit() {

    this.chargerListNiveau3();  
    this.chargerListeNiveau2();  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}