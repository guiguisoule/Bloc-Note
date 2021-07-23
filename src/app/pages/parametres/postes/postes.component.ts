import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { PosteService } from './model-service/poste.service';
import { PosteData } from './model-service/postes.model';



/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.css']
})
export class PostesComponent implements AfterViewInit {
  displayedColumns: string[] = ['posteid', 'libposte', 'star'];
  dataSource: MatTableDataSource<PosteData>;

  //creation d'un instance de poste connecte au formulaire d'ajout 
  poste: PosteData = new PosteData();

  //creation d'un instance de poste connecte au formulaire d'ajout 
  posteEdite: PosteData = new PosteData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private posteService: PosteService,
    private notificationService: NotificationsService) {
    // Create 100 poste
    // const posteData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des poste
    // this.chargerListPoste();

    this.posteService.getPosteList().subscribe(
      responce => {
        const posteData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(posteData);
      },
      error => {
        console.log(error);
        const posteData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(posteData);
      });

  }

  chargerListPoste(){
    this.posteService.getPosteList().subscribe(
      responce => {
        console.log(responce)
        const posteData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(posteData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const posteData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(posteData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSave(){

    this.posteService.getPoste(this.poste.posteid).subscribe(
      responce => {
        //Operation si le poste existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce poste exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau poste

        this.posteService.createPoste(this.poste).subscribe(
          responce => {
            console.log(responce)
            this.chargerListPoste();
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

     this.posteService.createPoste(this.posteEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListPoste();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idPoste : string){
    this.posteService.getPoste(idPoste).subscribe(
      responce => {
        this.posteEdite.posteid = responce['posteid'];
        this.posteEdite.libposte = responce['libposte'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeletePoste(id : string){
    this.posteService.deletePoste(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListPoste();
  }

  ngAfterViewInit() {
    this.chargerListPoste();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
