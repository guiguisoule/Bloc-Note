import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/services/notifications.service';
import { PartenaireService } from './model-service/partenaire.service';
import { PartenaireData } from './model-service/partner.model';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.css']
})
export class PartenairesComponent implements OnInit {

  //creation d'un instance de partenaire connecte au formulaire d'ajout 
  partenaire: PartenaireData = new PartenaireData();

  partenaireList : PartenaireData[];

  //creation d'un instance de partenaire connecte au formulaire d'ajout 
  partenaireEdite: PartenaireData = new PartenaireData();


  constructor(
    private partenaireService: PartenaireService,
    private notificationService: NotificationsService) {
    
  }

  chargerListPartenaire(){
    this.partenaireService.getPartenaireList().subscribe(
      responce => {
        console.log(responce)
        this.partenaireList = responce;
      },
      error => {
        console.log(error);
        this.partenaireList = [];
      });
  }

  onSave(){

    this.partenaireService.getPartenaire(this.partenaire.id).subscribe(
      responce => {
        //Operation si le partenaire existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce partenaire exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau partenaire
        this.partenaire.logo = "default_logo.png";
        this.partenaireService.createPartenaire(this.partenaire).subscribe(
          responce => {
            console.log(responce)
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
    console.log(this.partenaireEdite)
     this.partenaireService.createPartenaire(this.partenaireEdite).subscribe(
       responce => {
         console.log(responce)
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
        this.partenaireEdite.id = responce['id'];
        this.partenaireEdite.lastupdate = responce['lastupdate'];
        this.partenaireEdite.link = responce['link'];
        this.partenaireEdite.logo = responce['logo'];
        this.partenaireEdite.name = responce['name'];
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

  ngOnInit() {
    this.chargerListPartenaire();
  }

}
