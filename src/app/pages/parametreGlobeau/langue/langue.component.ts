import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { LangueService } from '../langue/model-service/langue.service';
import { LangueData } from './model-service/langue.model';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.css']
})
export class LangueComponent implements AfterViewInit {
  displayedColumns: string[] = ['codelang', 'libellelang', 'star'];
  dataSource: MatTableDataSource<LangueData>;

  //creation d'un instance de langue connecte au formulaire d'ajout 
  langue: LangueData = new LangueData();

  //creation d'un instance de langue connecte au formulaire d'ajout 
  langueEdite: LangueData = new LangueData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private langueService: LangueService,
    private notificationService: NotificationsService) {
    // Create 100 langue
    // const langueData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des langue
    // this.chargerListLangue();

    this.langueService.getLangueList().subscribe(
      responce => {
        const langueData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(langueData);
      },
      error => {
        console.log(error);
        const langueData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(langueData);
      });

  }

  chargerListLangue(){
    this.langueService.getLangueList().subscribe(
      responce => {
        console.log(responce)
        const langueData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(langueData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const langueData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(langueData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.langueService.getLangue(this.langue.codelang).subscribe(
      responce => {
        //Operation si le langue existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce langue exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau langue

        this.langueService.createLangue(this.langue).subscribe(
          responce => {
            console.log(responce)
            this.chargerListLangue();
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

     this.langueService.createLangue(this.langueEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListLangue();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idLangue : string){
    this.langueService.getLangue(idLangue).subscribe(
      responce => {
        this.langueEdite.codelang = responce['codelang'];
        this.langueEdite.libellelang = responce['libellelang'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteLangue(id : string){
    this.langueService.deleteLangue(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListLangue();
  }

  ngAfterViewInit() {
    this.chargerListLangue();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
