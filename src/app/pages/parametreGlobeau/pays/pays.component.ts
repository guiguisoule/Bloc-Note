import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { DeviseData } from '../devises/model-service/devise.model';
import { DeviseService } from '../devises/model-service/devise.service';
import { LangueData } from '../langue/model-service/langue.model';
import { LangueService } from '../langue/model-service/langue.service';
import { PaysData } from './model-service/pays.model';
import { PaysService } from './model-service/pays.service';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nom_pays', 'capitale', 'superficie','population', 'indicatif', 'codedev', 'codelang', 'star'];
  dataSource: MatTableDataSource<PaysData>;

  //creation d'un instance de pays connecte au formulaire d'ajout 
  pays: PaysData = new PaysData();

  //creation d'un instance de pays connecte au formulaire d'ajout 
  paysEdite: PaysData = new PaysData();

  //liste des devises
  deviseList : DeviseData[];

  //liste des langues
  langueList : LangueData[]; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private paysService: PaysService,
    private deviseService: DeviseService,
    private langueService: LangueService,
    private notificationService: NotificationsService) {
    // Create 100 pays
    // const paysData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des pays
    // this.chargerListPays();

    // this.paysService.getPaysList().subscribe(
    //   responce => {
    //     const paysData = responce;
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(paysData);
    //   },
    //   error => {
    //     console.log(error);
    //     const paysData = [];
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(paysData);
    //   });
    this.chargerListeDevise();
    this.chargerListeLangue();
  }

  chargerListPays(){
    this.paysService.getPaysList().subscribe(
      responce => {
        console.log(responce)
        const paysData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(paysData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const paysData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(paysData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  chargerListeDevise(){
    this.deviseService.getDeviseList().subscribe(
     responce => {
       console.log(responce)
       this.deviseList = responce;
       
     },
     error => {
       console.log(error);
     });
    
   }

   chargerListeLangue(){
    this.langueService.getLangueList().subscribe(
     responce => {
       console.log(responce)
       this.langueList = responce;
       
     },
     error => {
       console.log(error);
     });
    
   }

  onSave(){

    this.paysService.getPays(this.pays.id).subscribe(
      responce => {
        //Operation si le pays existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce pays exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau pays
        //initialisation de dans_ci par defaut
        this.pays.dans_ci = 1;

        this.paysService.createPays(this.pays).subscribe(
          responce => {
            console.log(responce)
            this.chargerListPays();
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
     this.pays.dans_ci = 1;

     this.paysService.createPays(this.paysEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListPays();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idPays : string){
    this.paysService.getPays(idPays).subscribe(
      responce => {
        this.paysEdite.id = responce['id'];
        this.paysEdite.nom_pays = responce['nom_pays'];
        this.paysEdite.population = responce['population'];
        this.paysEdite.superficie = responce['superficie'];
        this.paysEdite.indicatif = responce['indicatif'];
        this.paysEdite.dans_ci = responce['dans_ci'];
        this.paysEdite.codelang = responce['codelang'];
        this.paysEdite.codedev = responce['codedev'];
        this.paysEdite.capitale = responce['capitale'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeletePays(id : string){
    this.paysService.deletePays(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListPays();
  }

  ngAfterViewInit() {
    this.chargerListPays();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
