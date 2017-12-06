import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotesService {

  constructor(private http: Http) { }

  getUserNotes(userId){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('notes/list/' + userId, {headers: headers}).
      map(res => res.json());
  }

  addNote(note){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('notes/create', note, {headers: headers}).
      map(res => res.json());
  }

  deleteNote(id){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('notes/remove', id, {headers: headers}).
      map(res => res.json());
  }
}
