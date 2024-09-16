import { FastaEntry } from './../model/FastaEntry.model';
import { FastaService } from './fasta.service';
import { ScoreModel } from './../model/ScoreModel.enum';
import { Injectable } from '@angular/core';
import { Aminoacid } from '../model/Aminoacid.model';
import { ListProcessingService } from './list-processing.service';

@Injectable({
  providedIn: 'root',
})
export class PROSITEProcessingService {
  //private conserved_map: string = '';

  private  fastaEntriesWithDashes: FastaEntry[] = [];
  private  max_length            : number = 0;

  constructor(private fastaService: FastaService, private listProcessingService : ListProcessingService) {

  }

  private xGapComparate(a: string, b: string): boolean{
    if(a === 'x' && b === 'x0') return true;
    if(b === 'x' && a === 'x0') return true;
    return false;
  }

  public parseFasta(
    content: string
  ): { name: string; sequence: string }[] {

        const lines = content.split('\n');
        const entries: { name: string; sequence: string }[] = [];
        //const entries2 : Protein[] = [];
        let name = '';
        let sequence = '';
        for (const line of lines) {
          if (line.startsWith('>')) {
            if (name !== '' && sequence !== '') {
              entries.push({ name, sequence });
            }
            name = line.substring(1).trim(); // Remove o ">" e espaços em branco
            sequence = ''; // Limpa a sequência para a próxima proteína
          } else {
            sequence += line.trim();
          }
        }
        if (name !== '' && sequence !== '') {
          entries.push({ name, sequence });
        }
        return entries;

  }

  /*
   * Função para que recebe um array de entradas Fastas, que é um objetico
   * no padrão {name,sequence}
   */
  private scatteredConservationPattern(
    fastaEntries: FastaEntry[],
    score_model_conservation: ScoreModel
  ): string[] {

        const scattered_conservation_pattern: string[] = [];
        [this.fastaEntriesWithDashes,this.max_length] = this.fastaService.completeSequencesWithDash(fastaEntries);

        //console.log("MAXIMO: " + max_length);

        for (let i = 0; i < this.max_length; i++) {
          const charactersAtPositionI = this.fastaEntriesWithDashes.map(
            (entry) => entry.sequence[i]
          );

          //console.log("CARACTERES NA POSIÇÃO " + i + "DAS SEQUENCIAS: " + charactersAtPositionI + "\n");
          //const currentlyChar = fastaEntries[0].sequence[i];
          const currentlyChar = this.listProcessingService.findMostFrequentElement(charactersAtPositionI);

          const fullConservation = charactersAtPositionI.every(
            (aminoacid) => aminoacid === charactersAtPositionI[0]
          );


          const conservation =
            score_model_conservation === 'BLOSUM62'
              ? charactersAtPositionI.every((amino) =>
                  Aminoacid.getAminoacid(
                    amino
                  ).equalsSubstitutionMatrixBlossum62_1(
                    Aminoacid.getAminoacid(currentlyChar)
                  )
                )
              : charactersAtPositionI.every((amino) =>
                  Aminoacid.getAminoacid(amino).equalsClassification(
                    Aminoacid.getAminoacid(currentlyChar)
                  )
                );

          //console.log("(" + i + ") - CONSERVAÇÃO: " + conservation);

          if (fullConservation) {
            if (currentlyChar === '-' || currentlyChar === '.') {
              //this.conserved_map += ' ';
              // prosite_motif_pattern += "x";
              scattered_conservation_pattern.push('-');

            } else {
              scattered_conservation_pattern.push(currentlyChar || '0');

              //this.conserved_map += '*';
            }
          } else {
            if (conservation) {
              const uniqueCharacters = [
                ...new Set(charactersAtPositionI.join('')),
              ];
              scattered_conservation_pattern.push(
                '[' + uniqueCharacters.join('') + ']'
              );
            } else {
              /*esse if e else é para saber se tem gaps na colunas
              se sim
              isso significa que em pelo menos uma ptreína tem um
              gap nessa coluna

              se não, simplesmente adiciona um x
              */
              if(charactersAtPositionI.includes('-'))
                 scattered_conservation_pattern.push('x0');
               else
               {
                scattered_conservation_pattern.push('x');
              }
            }
          }
      }
      return scattered_conservation_pattern;
  }

  private xMinMaxOnTheGaps(a: number, b: number): [number,number]{

    let result : [number,number] = [0,0];
    const lenght = b - a + 1;
    let min = 999;
    let max = 0;

    for(const fastaEntry of this.fastaEntriesWithDashes){
      const sub = fastaEntry.sequence.substring(a,b);
      const number_of_x   = lenght - (sub.split('-').length - 1);

      if (number_of_x < min)  min = number_of_x - 1;
      if (number_of_x > max) max = number_of_x;
    }

    result = [min,max];
    return result;
  }

  private groupRepeatedStrings(
    scattered_conservation_pattern: string[]
  ): [string[],[number,number]][] {

        const result: [string[],[number,number]][] = [];

        const result_aux: string[][] = [];
        const range: [number,number][] = [];
        let temp: string[] = [];

        for (let i = 0; i < scattered_conservation_pattern.length; i++) {
          if(
            this.xGapComparate(temp[temp.length - 1],scattered_conservation_pattern[i])
          ){
            temp.push('x0');
          }
          else if (
            temp.length === 0 ||
            temp[temp.length - 1] === scattered_conservation_pattern[i]
          ) {
            temp.push(scattered_conservation_pattern[i]);
          }
          else {

            result_aux.push([...temp]);
            temp = [scattered_conservation_pattern[i]];
            if(result_aux.length === 1){
              range.push([0,i]);
              result.push([result_aux[0],range[0]]);
            }
            else{
              range.push([range[range.length - 1][1] + 1,i]);
              result.push([result_aux[result_aux.length - 1],range[range.length - 1]]);
            }
          }
        }
        if (temp.length > 0) {
          result.push([[...temp],[range[range.length - 1][1],scattered_conservation_pattern.length - 1]]);
        }
        //console.log(result);
        return result;
  }

  private countGroupRepeatedStrings(
    fastaEntries: FastaEntry[],
    group_repeated_strings: [string[],[number,number]][]
  ): [string, number,[number,number]][] {

        //const fastaEntriesWithDashes = this.fastaService.completeSequencesWithDash(fastaEntries)[0];

        const result: [string, number,[number,number]][] = [];
        //const aux : [number,number][] = [];

        for (const repeats of group_repeated_strings) {


         // if(repeats[0][0] === 'x0'){
           // const aux = this.xMinMaxOnTheGaps(repeats[1][0],repeats[1][1]);


           //// result.push(['x(' + aux[0] + ',' + aux[1] + ')', repeats.length]);
          //}

          result.push([repeats[0][0], repeats[0].length,repeats[1]]);
        }

        //Se o primeiro elemento for x ou full gap remover
      //  if (result[0][0] === '-' || result[0][0] === 'x') {
        //  result.shift();
       // }

        //Se o último elemento for x ou full gap remover
       // if (result[result.length - 1][0] === '-') result.pop();
       // if (result[result.length - 1][0] === 'x') result.pop();
        //console.log(result);
        return result;

  }

  private xTresholdDivider(
    count_group_repeated_strings: [string, number,[number,number]][],
    xthreshold: number | null
  ):[string, number,[number,number]][][] {

        const result: [string, number,[number,number]][][] = [];
        let aux: [string, number,[number,number]][] = [];

        if (xthreshold === null) xthreshold = 20;

        for (const group of count_group_repeated_strings) {
          if (((group[0] === 'x' || group[0] === 'x0') && group[1] < xthreshold) || (group[0] != 'x' && group[0] != 'x0'))
            aux.push(group);
          else if (aux.length > 0) {
            result.push(aux);
            aux = [];
          }
        }
        if (aux.length > 0) {
          result.push(aux);
        }
        return result;

  }

  private fitxTresholdDivider(
    PROSITE_motifs_pattern_x_threshold_divided: [string, number,[number,number]][][]
  ): [string, number,[number,number]][][] {

        const result: [string, number,[number,number]][][] = [];
        for (const motif of PROSITE_motifs_pattern_x_threshold_divided) {

          if(motif[0][0] === '-') motif.shift();
          //if(motif[motif.length - 1][0] === '-') motif.pop();
          if (motif.length !== 0) {
            result.push(motif);
          }
        }
        console.log(result);
       return  result;

  }

  private formatPROSITEmotifsPattern(
    PROSITE_motifs_pattern_x_threshold_divided: [string, number,[number,number]][][]
  ): string[][]
  {
        const result: string[][] = [];
        let aux: string[] = [];

        for (const pattern of PROSITE_motifs_pattern_x_threshold_divided)
          {
          for (const conservation of pattern)
            {
            if (conservation[1] > 1)
              {
              if(conservation[0] === 'x0')
              {
                const auxx = this.xMinMaxOnTheGaps(conservation[2][0],conservation[2][1]);
                aux.push('x(' + auxx[0] + ',' + auxx[1] + ')');
              }
              else
              {
                aux.push(conservation[0] + '(' + conservation[1] + ')');
              }
            }

            else
            {
              aux.push(conservation[0]);
            }
          }
          result.push(aux);
          aux = [];
        }
        return result;

  }

  public processFasta(fastaContent: string,score_model_conservation: ScoreModel, xthreshold: number | null,): string[][] {

   // let maxLength: number;

   const fastaEntries = this.parseFasta(fastaContent);
    //this.fastaService.completeSequencesWithDash().subscribe

    return this.formatPROSITEmotifsPattern(
      this.fitxTresholdDivider(
      this.xTresholdDivider(
        this.countGroupRepeatedStrings(
          fastaEntries,
          this.groupRepeatedStrings(
            this.scatteredConservationPattern(
              fastaEntries
              ,score_model_conservation)
            )
        ) ,xthreshold))
    );
  }
}
