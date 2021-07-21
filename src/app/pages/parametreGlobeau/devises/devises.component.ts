import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { DeviseData } from './model-service/devise.model';
import { DeviseService } from './model-service/devise.service';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-devises',
  templateUrl: './devises.component.html',
  styleUrls: ['./devises.component.css']
})
export class DevisesComponent implements AfterViewInit {
  displayedColumns: string[] = ['codedev', 'libelledev', 'star'];
  dataSource: MatTableDataSource<DeviseData>;

  //creation d'un instance de devise connecte au formulaire d'ajout 
  devise: DeviseData = new DeviseData();

  //creation d'un instance de devise connecte au formulaire d'ajout 
  deviseEdite: DeviseData = new DeviseData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private deviseService: DeviseService,
    private notificationService: NotificationsService) {
    // Create 100 devise
    // const deviseData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des devise
    // this.chargerListDevise();

    this.deviseService.getDeviseList().subscribe(
      responce => {
        const deviseData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(deviseData);
      },
      error => {
        console.log(error);
        const deviseData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(deviseData);
      });

  }

  chargerListDevise(){
    this.deviseService.getDeviseList().subscribe(
      responce => {
        console.log(responce)
        const deviseData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(deviseData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const deviseData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(deviseData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.deviseService.getDevise(this.devise.codedev).subscribe(
      responce => {
        //Operation si le devise existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce devise exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau devise

        this.deviseService.createDevise(this.devise).subscribe(
          responce => {
            console.log(responce)
            this.chargerListDevise();
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

     this.deviseService.createDevise(this.deviseEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListDevise();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idDevise : string){
    this.deviseService.getDevise(idDevise).subscribe(
      responce => {
        this.deviseEdite.codedev = responce['codedev'];
        this.deviseEdite.libelledev = responce['libelledev'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteDevise(id : string){
    this.deviseService.deleteDevise(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListDevise();
  }

  ngAfterViewInit() {
    this.chargerListDevise();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
