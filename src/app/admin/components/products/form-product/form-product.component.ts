import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from '../../../../utils/validators';

import { ProductsService } from '../../../../core/services/products/products.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '@core/models/Category.model';
import { CategoriesService } from '@core/services/categories/categories.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  categories: Category[]

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private fireStorage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    console.log(this.form.value);
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: ['', Validators.required],
      category_id: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  public uploadFile(event){;
    const file: File = event.target.files[0];
    const dir = 'images';
    const fileRef: AngularFireStorageReference = this.fireStorage.ref(dir);
    const task: AngularFireUploadTask = this.fireStorage.upload(dir, file);
    
    task.snapshotChanges().pipe(
      finalize(() => { 
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe((url: string) => { 
          console.log(url);
          this.form.get('image').setValue(url)
        } )
      })
    ).subscribe()
  }

  get priceField() {
    return this.form.get('price');
  }

  private getCategories(){
    this.categoriesService.getAllCategories()
    .subscribe((categories) => {
      this.categories = categories;
    })
  }

}
