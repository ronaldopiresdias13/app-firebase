import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  todoForm: FormGroup;

  constructor(
    private crudService: CrudService,
    public formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: [''],
      description: ['']
    })
  }
  onSubmit() {
    if (!this.todoForm.valid) {
      return false;
    } else {
      this.crudService.create(this.todoForm.value)
      .then(() => {
        this.todoForm.reset();
        this.router.navigate(['/todo-list']);
        this.presentToast("Item salvo com sucesso!!!!")
      }).catch((err) => {
        this.presentToast("Erro ao salvar item!!")
      });
    }
  }
  async presentToast(mesage: string) {
    const toast = await this.toastController.create({
      message: mesage,
      duration: 2000
    });
    await toast.present();
  }


}
