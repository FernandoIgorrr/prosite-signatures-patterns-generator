import { PROSITEProcessingService } from './../../service/prosite-processing.service';
import { ScoreModel } from '../../model/ScoreModel.enum';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';

import { FastaEntry } from '../../model/FastaEntry.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { aminoacidColorMap } from '../../model/ColorMap.model';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { CommonModule, NgForOf, NgStyle } from '@angular/common';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatButtonModule   } from '@angular/material/button';



import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-prosite-motif-pattern',
  standalone: true,
  imports: [MatButtonToggleModule,
    MatIconModule,MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            FontAwesomeModule,
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            ReactiveFormsModule,

            ],
  templateUrl: './prosite-signatures-patterns.component.html',
  styleUrl: './prosite-signatures-patterns.component.scss'
})
export class PrositeSignaturesPatternsComponent {

  faInfoCircle = faInfoCircle;
  faCopy=faCopy;

  title = 'BIOINFORMÁTICA ESTRUTURAL';

  prosite_assinatures: string[][] = [];
  //sequences: string[] = [];
  //sequences_names: string[] = [];
  fastaEntries: FastaEntry[] = [];
  //protein: Protein[] = [];
  //scattered_conservation_pattern: string[] = [];

  COLOR_MAP_HEX: { [key: string]: string } = aminoacidColorMap.COLOR_MAP_HEX;
  //coloredProtein: string = '';

  score_model_conservation_toggle_options: string[];
  score_model_conservation: ScoreModel;
  xthresholdFormControl = new FormControl(20, [
    Validators.pattern('^[0-9]*$'),
    Validators.required,
    Validators.min(1),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    //private fastaService: FastaService,
    private prositeProcessingService: PROSITEProcessingService,
    public dialog: MatDialog
  ) {
    this.score_model_conservation_toggle_options = [
      ScoreModel.CLASSIFICATION,
      ScoreModel.BLOSUM62,
    ];
    this.score_model_conservation = ScoreModel.CLASSIFICATION; // Define a opção padrão
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files ? element.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;

        this.fastaEntries = this.prositeProcessingService.parseFasta(contents);

        this.prosite_assinatures = this.prositeProcessingService.processFasta(
          contents,
          this.score_model_conservation,
          this.xthresholdFormControl.value
        );
      };
      reader.readAsText(file);
    }
  }

  openInfoDialog(info_num: number): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: info_num,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result;
    });
  }

  /*fillFastaProtein(fastaEntry:FastaEntry) : Protein{

    //let protein : Protein = {name : fastaEntry.name, sequence : []};
    const protein : Protein = new Protein(fastaEntry.name, []);

    for (const aminoacid of fastaEntry.sequence) {
      protein.sequence.push(Aminoacid.getAminoacid(aminoacid));
    }
    return protein;
  }*/

  getColor(amino: string): string {
    return this.COLOR_MAP_HEX[amino] || 'white'; // Cor padrão caso não haja uma cor definida
  }

  /*selectOptionScoreModel() {
    if (this.score_model_conservation === "Aminoacid classification") {
      this.scattered_conservation_pattern = this.scatteredConservationPattern_AMINOACID_CLASSIFICATION(this.fastaEntries);
    }
    else if (this.score_model_conservation === "BLOSUM62") {
      this.scattered_conservation_pattern = this.scatteredConservationPattern_BLOSUM_62_MATRIX(this.fastaEntries);
    }

    for(const entry of this.fastaEntries){
      this.protein.push(this.fillFastaProtein(entry));
    }
  }*/

  public copyText(event: MouseEvent | Event, text: string) {
    event.stopPropagation();
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error('Erro ao copiar texto:', err);
      });
  }
}
