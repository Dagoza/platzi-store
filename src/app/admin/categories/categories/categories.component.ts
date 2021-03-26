import { Component, OnInit } from '@angular/core';
import { Category } from '@core/models/Category.model';
import { CategoriesService } from '@core/services/categories/categories.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
	categories: Category[] = []
	displayedColumns: string[] = ['id', 'name', 'image', 'actions']
  
  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
		this.categoriesService.getAllCategories()
			.subscribe(categories => {
				this.categories = categories
			})
	}

}
