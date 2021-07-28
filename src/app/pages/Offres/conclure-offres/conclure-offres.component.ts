import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeviseData } from 'app/pages/parametreGlobeau/devises/model-service/devise.model';
import { DeviseService } from 'app/pages/parametreGlobeau/devises/model-service/devise.service';
import { NotificationsService } from 'app/services/notifications.service';
import { OffreData } from '../model-service/offre.model';
import { OffreService } from '../model-service/offre.service';

@Component({
  selector: 'app-conclure-offres',
  templateUrl: './conclure-offres.component.html',
  styleUrls: ['./conclure-offres.component.css']
})
export class ConclureOffresComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'datecre', 'datemaj', 'opcre','opmaj', 'libelleoffre', 'typeoffre', 'idproduit',  'idtypean', 'qteoffre', 'prixoffre', 'valide',  'conclus', 'dateoffre', 'dateval',  'coordx',  'coordy',  'idacteur',  'photo',  'idunit',  'statut',  'codedev','star'];
  dataSource: MatTableDataSource<OffreData>;

  //creation d'un instance de offre connecte au formulaire d'ajout 
  offre: OffreData = new OffreData();

  //creation d'un instance de offre connecte au formulaire d'ajout 
  offreEdite: OffreData = new OffreData();

  //liste des devise
  deviseList: DeviseData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private offreService: OffreService,
    private deviseService: DeviseService,
    private notificationService: NotificationsService) {
    // Create 100 offre
    // const offreData = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //chargement de la liste des offre
    // this.chargerListOffre();

    // this.offreService.getOffreList().subscribe(
    //   responce => {
    //     const offreData = responce;
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(offreData);
    //   },
    //   error => {
    //     console.log(error);
    //     const offreData = [];
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(offreData);
    //   });

  }

  chargerListOffre(){
    this.offreService.getOffreAchatList().subscribe(
      responce => {
        console.log(responce)
        const offreData = responce;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(offreData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        const offreData = [];
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(offreData);

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
     }
    );
  }

  onSave(){

    this.offreService.getOffre(this.offre.id).subscribe(
      responce => {
        //Operation si le offre existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce offre exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau offre

        this.offreService.createOffre(this.offre).subscribe(
          responce => {
            console.log(responce)
            this.chargerListOffre();
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
    this.offreService.createOffre(this.offre).subscribe(
      responce => {
        console.log(responce)
        this.chargerListOffre();
        this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
      },
      error => {
        console.log(error);
        this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
      }
    );
  }

  onEdite(idOffre : string){
    this.offreService.getOffre(idOffre).subscribe(
      responce => {
        this.offreEdite.id = responce['id'];
        this.offreEdite.codedev = responce['codedev'];
        this.offreEdite.conclus = responce['conclus'];
        this.offreEdite.coordx = responce['coordx'];
        this.offreEdite.coordy = responce['coordy'];
        this.offreEdite.datecre = responce['datecre'];
        this.offreEdite.datemaj = responce['datemaj'];
        this.offreEdite.dateoffre = responce['dateoffre'];
        this.offreEdite.dateval = responce['dateval'];
        this.offreEdite.idacteur = responce['idacteur'];
        this.offreEdite.idproduit = responce['idproduit'];
        this.offreEdite.idtypean = responce['idtypean'];
        this.offreEdite.idunit = responce['idunit'];
        this.offreEdite.libelleoffre = responce['libelleoffre'];
        this.offreEdite.opcre = responce['opcre'];
        this.offreEdite.opmaj = responce['opmaj'];
        this.offreEdite.photo = responce['photo'];
        this.offreEdite.prixoffre = responce['prixoffre'];
        this.offreEdite.qteoffre = responce['qteoffre'];
        this.offreEdite.statut = responce['statut'];
        this.offreEdite.typeoffre = responce['typeoffre'];
        this.offreEdite.valide = responce['valide'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteOffre(id : string){
    this.offreService.deleteOffre(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListOffre();
  }

  ngAfterViewInit() {
    this.chargerListeDevise();
    this.chargerListOffre();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
