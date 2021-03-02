import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeData } from '@core/models/Employee.model';
import { GeneratorService } from '@core/services/generate/generate.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

const names = ['Daniel', "Natha", "Cookie", "Lana"]

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  salesList: EmployeeData[];
  secondList: EmployeeData[];
  value$: Observable<number>;
  value: number;
  sub$: Subscription;
  private readonly subs$: Subscription = new Subscription();
  constructor(private generatorService: GeneratorService) {
    this.value$ = this.generatorService.getData()
    .pipe(
      tap(value => console.log(value))
    )
   }

  ngOnInit() {
    this.salesList = this.generatorService.generate(names, [10,20], 10)
    this.secondList = this.generatorService.generate(names, [10,20], 10)
    this.sub$ = this.generatorService.getData()
    .subscribe(value => {   
      this.value = value;
      console.log(value);
      
    })
    this.subs$.add(this.sub$)
    // this.subs$.add(...)
  }

  ngOnDestroy(){
    this.subs$.unsubscribe()
  }

  addItem(list:EmployeeData[], label: string){
    list.unshift(
      { 
        label,
        num: this.generatorService.generateNumber([20, 40])
      }
    )
  }

 

 
}
