import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

import {  MatIconModule     } from '@angular/material/icon';
import {  MatButtonModule   } from '@angular/material/button';
import {  MatToolbarModule  } from '@angular/material/toolbar';
import {  MatTabsModule     } from '@angular/material/tabs';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prosite-signatures-patterns-generator';
}
