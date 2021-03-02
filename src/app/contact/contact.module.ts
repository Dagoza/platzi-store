import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ListComponent } from './components/list/list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from '@material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    ContactRoutingModule
  ]
})
export class ContactModule {

}
