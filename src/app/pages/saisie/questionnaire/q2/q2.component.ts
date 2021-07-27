import { Component, OnInit } from '@angular/core';
import { AnimalData } from 'app/pages/parametres/animal/animals/model-service/animal.model';
import { AnimalService } from 'app/pages/parametres/animal/animals/model-service/animal.service';
import { NotificationsService } from 'app/services/notifications.service';
import { Q2Data } from './model-service/q2.model';
import { Questionnaire3Service } from './model-service/questionnaire3.service';

@Component({
  selector: 'app-q2',
  templateUrl: './q2.component.html',
  styleUrls: ['./q2.component.css']
})
export class Q2Component implements OnInit {

  //creation d'un instance de q2 connecte au formulaire d'ajout 
  q2: Q2Data = new Q2Data();

  //liste des animal
  animalList: AnimalData[];


  constructor(
    private q2Service: Questionnaire3Service,
    private animalService: AnimalService,
    private notificationService: NotificationsService) {

  }


  ngOnInit() {
    this.chargerListeAnimal();   
  }

  chargerListeAnimal(){
    this.animalService.getAnimalList().subscribe(
     responce => {
       console.log(responce)
       this.animalList = responce;
       
     },
     error => {
       console.log(error);
     });
    
   }

  onSave(){

    this.q2Service.getQ2(this.q2.collecteID).subscribe(
      responce => {
        //Operation si le q2 existe deja
        this.notificationService.showNotification('danger', 'Echec : Ce q2 exist deja !<br>Merci de changer les identifients');
      },
      error => {
        //Enregistrement du nouveau q2

        this.q2Service.createQ2(this.q2).subscribe(
          responce => {
            console.log(responce)
            this.notificationService.showNotification('success', 'Succes : Enregistrement effectue avec succes');
          },
          error => {
            console.log(error);
            this.notificationService.showNotification('danger', 'Echec : Une erreure s\'est produit lors de l\'enregistrement');
          }
        );
        
      });

   
  }


}
