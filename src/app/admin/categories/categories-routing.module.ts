import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './container/category/category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'create',
    component: CategoryComponent
  },
  {
    path: 'edit/:id',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
