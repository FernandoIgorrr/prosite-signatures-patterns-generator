//import { faGithub } from './../../../node_modules/@fortawesome/free-brands-svg-icons/faGithub.d';
import { Component } from '@angular/core';


import { PrositeSignaturesPatternsComponent } from './prosite-signatures-patterns/prosite-signatures-patterns.component';
import { FrequencyMatrixCalculatorComponent } from './frequency-matrix-calculator/frequency-matrix-calculator.component';


import {  MatIconModule     } from '@angular/material/icon';
import {  MatButtonModule   } from '@angular/material/button';
import {  MatToolbarModule  } from '@angular/material/toolbar';
import {  MatTabsModule     } from '@angular/material/tabs';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule,
            MatButtonModule,
            MatIconModule,
            FontAwesomeModule,
            MatTabsModule,
           CommonModule,
            ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  faGithub = faGithub;

  tabs = [
    { title: 'PROSITE motif pattern', content: PrositeSignaturesPatternsComponent },
    { title: 'Frequency matrix calculator', content: FrequencyMatrixCalculatorComponent },
    // Adicione quantas guias desejar
  ];
}
