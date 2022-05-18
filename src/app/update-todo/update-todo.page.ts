import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.page.html',
  styleUrls: ['./update-todo.page.scss'],
})
export class UpdateTodoPage implements OnInit {
  editForm: FormGroup;
  id: any;

  constructor(
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getTask(this.id).subscribe((data) => {
      this.editForm = this.formBuilder.group({
        title: [data['title']],
        description: [data['description']]
      })
    });
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      title: [''],
      description: ['']
    })
  }
  onSubmit() {
    this.crudService.update(this.id, this.editForm.value)
  }

}
