import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './container/category/category.component';


@NgModule({
  declarations: [CategoriesComponent, CategoriesFormComponent, CategoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
