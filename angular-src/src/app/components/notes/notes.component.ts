import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotesService } from '../../services/notes.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  title: String;
  content: String;
  userId: String;
  notes: Object;

  constructor(
    private authService: AuthService,
    private notesService: NotesService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      profile => {
        this.userId = profile.user._id
        this.notesService.getUserNotes(this.userId).subscribe(
          notes => {
            this.notes = notes.notes
          },
          err => {
            console.log(err);
            return false;
          }
        )
      },
      err => {
        console.log(err);
        return false;
      }
    )
  }

  onCreateSubmit() {
    const note = {
      title: this.title,
      content: this.content,
      userId: this.userId
    }

    this.notesService.addNote(note).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Nota criada com sucesso', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Algo deu errado...', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  onDeleteClick(id) {
    const idObj = {
      id: id
    }
    this.notesService.deleteNote(idObj).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Nota deletada com sucesso', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Algo deu errado...', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}
