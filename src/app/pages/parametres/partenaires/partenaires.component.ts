import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { PartenaireService } from './model-service/partenaire.service';
import { PartenaireData } from './model-service/partner.model';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.css']
})
export class PartenairesComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_ol', 'libelle_ol', 'unite_ol' , 'star'];
  dataSource: MatTableDataSource<PartenaireData>;

  //creation d'un instance de animalType connecte au formulaire d'ajout 
  partenaire: PartenaireData = new PartenaireData();

  //creation d'un instance de animalType connecte au formulaire d'ajout 
  partenaireEdite: PartenaireData = new PartenaireData();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private partenaireService: PartenaireService,
    private notificationService: NotificationsService) {
    // Create 100 animalType
    // const animalTypeData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des animalType
    // this.chargerListPartenaire();

    this.partenaireService.getPartenaireList().subscribe(
      responce => {
        const partenaireData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(partenaireData);
      },
      error => {
        console.log(error);
        const partenaireData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(partenaireData);
      });

  }

  chargerListPartenaire(){
    this.partenaireService.getPartenaireList().subscribe(
      responce => {
        // console.log(responce)
        const partenaireData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(partenaireData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error => {
        console.log(error);
        const animalTypeData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(animalTypeData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }


  onSave(){

    this.partenaireService.getPartenaire(this.partenaire.partnerid).subscribe(
      responce => {
        //Operation si le animalType existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce animalType exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau animalType

        this.partenaireService.createPartenaire(this.partenaire).subscribe(
          responce => {
            // console.log(responce)
            this.chargerListPartenaire();
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

     this.partenaireService.createPartenaire(this.partenaireEdite).subscribe(
       responce => {
        //  console.log(responce)
         this.chargerListPartenaire();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idPartenaire : string){
    this.partenaireService.getPartenaire(idPartenaire).subscribe(
      responce => {

        this.partenaireEdite.partnerid = responce['partnerid'];
        this.partenaireEdite.name = responce['name'];
        this.partenaireEdite.logo = responce['logo'];
        this.partenaireEdite.link = responce['link'];
        this.partenaireEdite.lastupdate = responce['lastupdate'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeletePartenaire(id : string){
    this.partenaireService.deletePartenaire(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListPartenaire();
  }

  ngAfterViewInit() {

    this.chargerListPartenaire();  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}