import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TasksService } from '../../services/tasks.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  content: String;
  userId: String;
  tasks: Object;

  constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      profile => {
        this.userId = profile.user._id
        this.tasksService.getUserTasks(this.userId).subscribe(
          tasks => {
            this.tasks = tasks.tasks
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
    const task = {
      content: this.content,
      userId: this.userId
    }

    this.tasksService.addTask(task).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Tarefa criada com sucesso', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Algo deu errado...', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  onDeleteClick(id) {
    const idObj = {
      id: id
    }
    this.tasksService.deleteTask(idObj).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Tarefa deletada com sucesso', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Algo deu errado...', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}
