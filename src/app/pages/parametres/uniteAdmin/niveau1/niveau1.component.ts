import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PaysData } from 'app/pages/parametreGlobeau/pays/model-service/pays.model';
import { PaysService } from 'app/pages/parametreGlobeau/pays/model-service/pays.service';
import { NotificationsService } from 'app/services/notifications.service';
import { Niveau1Data } from './model-service/admin_niv1.model';
import { Niveau1Service } from './model-service/niveau1.service';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-niveau1',
  templateUrl: './niveau1.component.html',
  styleUrls: ['./niveau1.component.css']
})
export class Niveau1Component implements AfterViewInit {
  displayedColumns: string[] = ['id_al1', 'libelle_al1' , 'idPays', 'star'];
  dataSource: MatTableDataSource<Niveau1Data>;

  //creation d'un instance de niveau1 connecte au formulaire d'ajout 
  niveau1: Niveau1Data = new Niveau1Data();

  //creation d'un instance de niveau1 connecte au formulaire d'ajout 
  niveau1Edite: Niveau1Data = new Niveau1Data();

  paysList: PaysData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private niveau1Service: Niveau1Service,
    private paysService: PaysService,
    private notificationService: NotificationsService) {
    // Create 100 niveau1
    // const niveau1Data = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des niveau1
    // this.chargerListNiveau1();

    this.niveau1Service.getNiveau1List().subscribe(
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

  chargerListNiveau1(){
    this.niveau1Service.getNiveau1List().subscribe(
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

  chargerListePays(){
    this.paysService.getPaysList().subscribe(
     responce => {
      //  console.log(responce)
       this.paysList = responce;
     },
     error => {
       console.log(error);
     });
    
   }

  onSave(){

    this.niveau1Service.getNiveau1(this.niveau1.idPays).subscribe(
      responce => {
        //Operation si le niveau1 existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce niveau1 exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau niveau1

        this.niveau1Service.createNiveau1(this.niveau1).subscribe(
          responce => {
            // console.log(responce)
            this.chargerListePays();
            this.chargerListNiveau1();
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

     this.niveau1Service.createNiveau1(this.niveau1Edite).subscribe(
       responce => {
        //  console.log(responce)
         this.chargerListePays();
         this.chargerListNiveau1();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idNiveau1 : string){
    this.niveau1Service.getNiveau1(idNiveau1).subscribe(
      responce => {

        this.chargerListePays();

        this.niveau1Edite.idPays = responce['idPays'];
        this.niveau1Edite.id_al1 = responce['id_al1'];
        this.niveau1Edite.libelle_al1 = responce['libelle_al1'];
        this.niveau1Edite.id_pays = responce['id_pays'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteNiveau1(id : string){
    this.niveau1Service.deleteNiveau1(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListNiveau1();
      this.chargerListePays();
  }

  ngAfterViewInit() {

    this.chargerListNiveau1();  
    this.chargerListePays();  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
