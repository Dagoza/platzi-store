import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { TableComponent } from './components/table/table.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormProductComponent } from './components/products/form-product/form-product.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';



@NgModule({
  declarations: [ProductFormComponent, NavComponent, TableComponent, DashboardComponent, ProductsListComponent, FormProductComponent, ProductEditComponent, BasicFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AdminModule { }
