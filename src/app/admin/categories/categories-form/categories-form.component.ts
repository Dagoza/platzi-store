import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@core/models/Category.model';
import { CategoriesService } from '@core/services/categories/categories.service';
import { finalize } from 'rxjs/operators';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isNew: boolean;
  @Input() 
  set category(data: Category) {
    if(data) {
      this.isNew = false;
      this.form.patchValue(data)
    }
    this.isNew = true;    
  };

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(
    private fb:FormBuilder,
    private categoriesService: CategoriesService,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
   }

  ngOnInit(): void { }



  private buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)], MyValidators.validateCategory(this.categoriesService)] ,
      image: ['', Validators.required]
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save() {
    if (this.form.valid) {
     (!this.isNew ? this.create:this.update).emit(this.form.value)
    } else {
      this.form.markAllAsTouched();
    }
  }


  uploadFile(event){
    const firstFile = 0;
    const image = event.target.files[firstFile] as File;
    const name = `categories/${image.name}`;
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe(url => {
          console.log(url);
          this.imageField.setValue(url);
        })
      })
    )
    .subscribe()
  }

}
