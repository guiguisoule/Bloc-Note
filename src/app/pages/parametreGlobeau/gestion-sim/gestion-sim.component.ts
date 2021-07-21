import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { SimData } from './model-service/sim.model';
import { SimService } from './model-service/sim.service';

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
  selector: 'app-gestion-sim',
  templateUrl: './gestion-sim.component.html',
  styleUrls: ['./gestion-sim.component.css']
})
export class GestionSimComponent implements AfterViewInit {
  displayedColumns: string[] = ['simid', 'idpays', 'nom_sim', 'description','sim_type', 'sim_tel', 'sim_bp', 'sim_mel',  'sim_webdite', 'contact', 'star'];
  dataSource: MatTableDataSource<SimData>;

  //creation d'un instance de sim connecte au formulaire d'ajout 
  sim: SimData = new SimData();

  //creation d'un instance de sim connecte au formulaire d'ajout 
  simEdite: SimData = new SimData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private simService: SimService,
    private notificationService: NotificationsService) {
    // Create 100 sim
    // const simData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des sim
    // this.chargerListSim();

    this.simService.getSimList().subscribe(
      responce => {
        const simData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(simData);
      },
      error => {
        console.log(error);
        const simData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(simData);
      });

  }

  chargerListSim(){
    this.simService.getSimList().subscribe(
      responce => {
        console.log(responce)
        const simData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(simData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const simData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(simData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.simService.getSim(this.sim.simid).subscribe(
      responce => {
        //Operation si le sim existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce sim exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau sim

        this.simService.createSim(this.sim).subscribe(
          responce => {
            console.log(responce)
            this.chargerListSim();
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
     this.sim.sim_logo = "default";

     this.simService.createSim(this.simEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListSim();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idSim : string){
    this.simService.getSim(idSim).subscribe(
      responce => {
        this.simEdite.simid = responce['simid'];
        this.simEdite.idpays = responce['idpays'];
        this.simEdite.nom_sim = responce['nom_sim'];
        this.simEdite.description = responce['description'];
        this.simEdite.sim_type = responce['sim_type'];
        this.simEdite.sim_tel = responce['sim_tel'];
        this.simEdite.sim_bp = responce['sim_bp'];
        this.simEdite.sim_mel = responce['sim_mel'];
        this.simEdite.sim_webdite = responce['sim_webdite'];
        this.simEdite.sim_logo = responce['sim_logo'];
        this.simEdite.contact = responce['contact'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteSim(id : string){
    this.simService.deleteSim(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListSim();
  }

  ngAfterViewInit() {
    this.chargerListSim();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
