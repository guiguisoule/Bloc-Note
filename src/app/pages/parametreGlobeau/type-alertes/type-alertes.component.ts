import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/services/notifications.service';
import { AlerteTypeData } from './model-service/alerte-type.model';
import { TypeAlerteService } from './model-service/type-alerte.service';

@Component({
  selector: 'app-type-alertes',
  templateUrl: './type-alertes.component.html',
  styleUrls: ['./type-alertes.component.css']
})
export class TypeAlertesComponent implements OnInit{

  //creation d'un instance de alerteType connecte au formulaire d'ajout 
  alerteType: AlerteTypeData = new AlerteTypeData();

  alerteTypeList : AlerteTypeData[];

  //creation d'un instance de alerteType connecte au formulaire d'ajout 
  alerteTypeEdite: AlerteTypeData = new AlerteTypeData();


  constructor(
    private alerteTypeService: TypeAlerteService,
    private notificationService: NotificationsService) {
    
  }

  chargerListAlerteType(){
    this.alerteTypeService.getAlerteTypeList().subscribe(
      responce => {
        console.log(responce)
        this.alerteTypeList = responce;
      },
      error => {
        console.log(error);
        this.alerteTypeList = [];
      });
  }

  onSave(){

    this.alerteTypeService.getAlerteType(this.alerteType.id).subscribe(
      responce => {
        //Operation si le alerteType existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce alerteType exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau alerteType
        this.alerteType.actif = 1;
        this.alerteTypeService.createAlerteType(this.alerteType).subscribe(
          responce => {
            console.log(responce)
            this.chargerListAlerteType();
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
     this.alerteTypeService.createAlerteType(this.alerteTypeEdite).subscribe(
       responce => {
         console.log(responce)
         this.chargerListAlerteType();
         this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
       },
       error => {
         console.log(error);
         this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
       });
       
  }

  onEdite(idAlerteType : string){
    this.alerteTypeService.getAlerteType(idAlerteType).subscribe(
      responce => {
        this.alerteTypeEdite.id = responce['id'];
        this.alerteTypeEdite.actif = responce['actif'];
        this.alerteTypeEdite.frequence = responce['frequence'];
        this.alerteTypeEdite.litypealrt = responce['litypealrt'];
        this.alerteTypeEdite.mel = responce['mel'];
        this.alerteTypeEdite.prejour = responce['prejour'];
        this.alerteTypeEdite.sms = responce['sms'];
        console.log(responce)
      },
      error => {
        this.notificationService.showNotification('danger', 'Echech : Une erreur s\'est produit lors de l\operation');
        console.log(error);
      });
  }

  onDeleteAlerteType(id : string){
    this.alerteTypeService.deleteAlerteType(id).subscribe(
      responce => {
        console.log(responce)
      },
      error => {
        console.log(error);
      });
      this.chargerListAlerteType();
  }

  ngOnInit() {
    this.chargerListAlerteType();
  }

}
