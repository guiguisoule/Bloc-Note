import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { SpecialiteData } from './model-service/specialite.model';
import { SpecialiteService } from './model-service/specialite.service';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-specialites',
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.css']
})
export class SpecialitesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id_specialite', 'lib_spe_EN', 'lib_spe_FR', 'lib_spe_PT','descr_speci', 'star'];
  dataSource: MatTableDataSource<SpecialiteData>;

  //creation d'un instance de specialite connecte au formulaire d'ajout 
  specialite: SpecialiteData = new SpecialiteData();

  //creation d'un instance de specialite connecte au formulaire d'ajout 
  specialiteEdite: SpecialiteData = new SpecialiteData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private specialiteService: SpecialiteService,
    private notificationService: NotificationsService) {
    // Create 100 specialite
    // const specialiteData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des specialite
    // this.chargerListSpecialite();

    this.specialiteService.getSpecialiteList().subscribe(
      responce => {
        const specialiteData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(specialiteData);
      },
      error => {
        console.log(error);
        const specialiteData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(specialiteData);
      });

  }

  chargerListSpecialite(){
    this.specialiteService.getSpecialiteList().subscribe(
      responce => {
        console.log(responce)
        const specialiteData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(specialiteData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const specialiteData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(specialiteData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.specialiteService.getSpecialite(this.specialite.id_specialite).subscribe(
      responce => {
        //Operation si le specialite existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce specialite exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau specialite

        this.specialiteService.createSpecialite(this.specialite).subscribe(
          responce => {
            console.log(responce)
            this.chargerListSpecialite();
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
     
     this.specialiteService.createSpecialite(this.specialiteEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListSpecialite();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idSpecialite : string){
    this.specialiteService.getSpecialite(idSpecialite).subscribe(
      responce => {
        this.specialiteEdite.id_specialite = responce['id_specialite'];
        this.specialiteEdite.lib_spe_FR = responce['lib_spe_FR'];
        this.specialiteEdite.lib_spe_EN = responce['lib_spe_EN'];
        this.specialiteEdite.lib_spe_PT = responce['lib_spe_PT'];
        this.specialiteEdite.descr_speci = responce['descr_speci'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteSpecialite(id : string){
    this.specialiteService.deleteSpecialite(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListSpecialite();
  }

  ngAfterViewInit() {
    this.chargerListSpecialite();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}