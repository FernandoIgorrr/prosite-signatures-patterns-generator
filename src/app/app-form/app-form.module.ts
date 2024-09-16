import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { PrositeSignaturesPatternsComponent } from '../home/prosite-signatures-patterns/prosite-signatures-patterns.component';

@NgModule({
  declarations: [HomeComponent,PrositeSignaturesPatternsComponent],
  imports: [
    CommonModule,
    FormControl,
    FormGroupDirective,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
  ]
})
export class AppFormModule { }
