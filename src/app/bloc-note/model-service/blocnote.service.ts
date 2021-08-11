import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { notEqual } from 'assert';
import { BlocNoteData } from './blocnote.model';

@Injectable({
  providedIn: 'root'
})
export class BlocnoteService {

  identif : number = 1;
  nb: number = 0;
  listeBlocNote : BlocNoteData[] = [
    // {
    //   id: 1,
    //   titre: "Note de bien venus",
    //   note: "Nous vous souhaitons la bien venu sur note application !",
    //   date: new Date().toString()
    // }
  ];

  

  constructor( private http: HttpClient) { }

  getBlocNoteList(): BlocNoteData[]{
    let i = 0;
    let listeBloc = [];
    this.listeBlocNote.forEach(element => {
      if(element.titre != null){
        listeBloc[i] = element;
        i=i+1;
      }
    });
    return listeBloc;
  }

  getId(){

    let id = this.identif;
    this.identif = this.identif + 1;
    return id;

  }

   getBlocNoteTitre(id: string): BlocNoteData {
    let val = parseInt(id);
    let note = new BlocNoteData();
    this.listeBlocNote.forEach(element => {
      if(element.id == val){
        note.id= element.id,
        note.titre= element.titre,
        note.note= element.note,
        note.date= element.date 
      }
    });
    return note;
  }

  createBlocNote(note: BlocNoteData){
    this.listeBlocNote.push(note);
    this.nb = this.nb + 1;
  }

  updateBlocNote(note: BlocNoteData){
    this.listeBlocNote.forEach(element => {
      if(element.id == note.id){
        element.titre = note.titre;
        element.note = note.note;
        element.date = note.date;
      }
    });
  }

  deleteBlocNote(id: string) {
    let val = parseInt(id);
    this.listeBlocNote.forEach(element => {
      if(element.id == val){
        val = val - 1;
        delete this.listeBlocNote[val];
        this.nb = this.nb - 1;
      }
    });
    
  }

}
