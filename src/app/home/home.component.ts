//import { faGithub } from './../../../node_modules/@fortawesome/free-brands-svg-icons/faGithub.d';
import { Component } from '@angular/core';


import {  MatIconModule     } from '@angular/material/icon';
import {  MatButtonModule   } from '@angular/material/button';
import {  MatToolbarModule  } from '@angular/material/toolbar';
import {  MatTabsModule     } from '@angular/material/tabs';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule,
            MatButtonModule,
            MatIconModule,
            FontAwesomeModule,
            MatTabsModule
            ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  faGithub = faGithub;
}
