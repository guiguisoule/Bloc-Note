import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService } from 'app/services/notifications.service';
import { BlocNoteData } from './model-service/blocnote.model';
import { BlocnoteService } from './model-service/blocnote.service';

@Component({
  selector: 'app-bloc-note',
  templateUrl: './bloc-note.component.html',
  styleUrls: ['./bloc-note.component.css']
})
export class BlocNoteComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'titre', 'note','date', 'star'];
  dataSource: MatTableDataSource<BlocNoteData>;

  //creation d'un instance de BlocNote connecte au formulaire d'ajout 
  BlocNote: BlocNoteData = new BlocNoteData();

  //creation d'un instance de BlocNote connecte au formulaire d'ajout 
  BlocNoteEdite: BlocNoteData = new BlocNoteData();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private BlocNoteService: BlocnoteService,
    private notificationService: NotificationsService) {
    
      this.chargerListBlocNote();

  }

  chargerListBlocNote(){

    const blocNoteData = this.BlocNoteService.getBlocNoteList();
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(blocNoteData);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // let responce = this.BlocNoteService.getBlocNoteList();

    // if(responce){
    //   const BlocNoteData = this.BlocNoteService.getBlocNoteList();
    //   // Assign the data to the data source for the table to render
    //   this.dataSource = new MatTableDataSource(BlocNoteData);

    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }else{
    //     const BlocNoteData = [];
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(BlocNoteData);

    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }
    
  }
   
  onSave(){

    //Enregistrement du nouveau BlocNote
    //initialisation de la note
    let note = {
      id: this.BlocNoteService.getId(),
      titre: this.BlocNote.titre,
      note: this.BlocNote.note,
      date: new Date().toString()
    }
    this.BlocNoteService.createBlocNote(note);
    this.chargerListBlocNote();

    this.notificationService.showNotification('success', 'Succes<br>Enregistrement effectue avec succes');
  }

  onSaveEdite(){
    //Enregistrement du nouveau BlocNote
    //initialisation de la note
    let note = {
      id: this.BlocNoteEdite.id,
      titre: this.BlocNoteEdite.titre,
      note: this.BlocNoteEdite.note,
      date: new Date().toString()
    }

    this.BlocNoteService.updateBlocNote(note);
    this.chargerListBlocNote();

    this.notificationService.showNotification('success', 'Succes<br>Enregistrement effectue avec succes');
  }

  onEdite(idBlocNote : string){
    this.BlocNoteEdite = this.BlocNoteService.getBlocNoteTitre(idBlocNote);
  }

  onDelete(id : string){
    this.BlocNoteService.deleteBlocNote(id);
    
    this.chargerListBlocNote();
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
