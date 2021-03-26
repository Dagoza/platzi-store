import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '@core/models/Category.model';
import { CategoriesService } from '@core/services/categories/categories.service';
import { ProductsService } from '@core/services/products/products.service';
import { MyValidators } from 'src/app/utils/validators';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  categories: Category[];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
      });
    });
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      category_id: ['', Validators.required],
      description: ['', [Validators.required]],
    });
  }

  
  private getCategories(){
    this.categoriesService.getAllCategories()
    .subscribe((categories) => {
      this.categories = categories;
    })
  }

  get priceField() {
    return this.form.get('price');
  }

}
