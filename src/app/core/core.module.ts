import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from '../app-routing.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule,
  ],
  exports: [NavbarComponent]
})
export class CoreModule { }
