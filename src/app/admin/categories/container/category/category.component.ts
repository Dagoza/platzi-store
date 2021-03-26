import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '@core/models/Category.model';
import { CategoriesService } from '@core/services/categories/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        if(params.id){
          this.getCategory(params.id)
        };
      }
    )
  }

  private getCategory(id: string){
    this.categoriesService.getCategory(id)
    .subscribe(rta => {
      this.category = rta;
    });
  }

    createCategory(data: Partial<Category> ) {
    this.categoriesService.createCategory(data)
    .subscribe(rta => {
      this.router.navigate(['/admin/categories']);
    });
  }

  
    updateCategory(data: Partial<Category>) {
    this.categoriesService.updateCategory(this.category._id,data)
    .subscribe(rta => {
      this.router.navigate(['/admin/categories']);
    });
  }
}
