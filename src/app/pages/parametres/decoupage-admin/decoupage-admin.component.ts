import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PaysData } from 'app/pages/parametreGlobeau/pays/model-service/pays.model';
import { PaysService } from 'app/pages/parametreGlobeau/pays/model-service/pays.service';
import { NotificationsService } from 'app/services/notifications.service';
import { DecoupageAdminService } from './model-service/decoupage-admin.service';
import { DecoupageData } from './model-service/pays-niveau.model';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-decoupage-admin',
  templateUrl: './decoupage-admin.component.html',
  styleUrls: ['./decoupage-admin.component.css']
})
export class DecoupageAdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'level' , 'libellenivpays', 'star'];
  dataSource: MatTableDataSource<DecoupageData>;

  //creation d'un instance de decoupage connecte au formulaire d'ajout 
  decoupage: DecoupageData = new DecoupageData();

  //creation d'un instance de decoupage connecte au formulaire d'ajout 
  decoupageEdite: DecoupageData = new DecoupageData();

  paysList: PaysData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private decoupageService: DecoupageAdminService,
    private paysService: PaysService,
    private notificationService: NotificationsService) {
    // Create 100 decoupage
    // const decoupageData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des decoupage
    // this.chargerListDecoupage();

    this.decoupageService.getDecoupageList().subscribe(
      responce => {
        const decoupageData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(decoupageData);
      },
      error => {
        console.log(error);
        const decoupageData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(decoupageData);
      });

  }

  chargerListDecoupage(){
    this.decoupageService.getDecoupageList().subscribe(
      responce => {
        // console.log(responce)
        const decoupageData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(decoupageData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error => {
        console.log(error);
        const decoupageData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(decoupageData);

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

    this.decoupageService.getDecoupage(this.decoupage.id).subscribe(
      responce => {
        //Operation si le decoupage existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce decoupage exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau decoupage

        this.decoupageService.createDecoupage(this.decoupage).subscribe(
          responce => {
            // console.log(responce)
            this.chargerListePays();
            this.chargerListDecoupage();
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

     this.decoupageService.createDecoupage(this.decoupageEdite).subscribe(
       responce => {
        //  console.log(responce)
         this.chargerListePays();
         this.chargerListDecoupage();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idDecoupage : string){
    this.decoupageService.getDecoupage(idDecoupage).subscribe(
      responce => {

        this.chargerListePays();

        this.decoupageEdite.id = responce['id'];
        this.decoupageEdite.level = responce['level'];
        this.decoupageEdite.libellenivpays = responce['libellenivpays'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteDecoupage(id : string){
    this.decoupageService.deleteDecoupage(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListDecoupage();
      this.chargerListePays();
  }

  ngAfterViewInit() {

    this.chargerListDecoupage();  
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
