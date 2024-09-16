import { Injectable } from '@angular/core';
import { FastaEntry } from '../model/FastaEntry.model';

@Injectable({
  providedIn: 'root',
})
export class FastaService {
  constructor() {}
  /*
    Esse método calcular a maior proteina para poder "alinha-lá" as outras
    em questão de tamanho e ai preenche os últimos caracteres das menores
    com dashes "-" para todas ficarem do mesmo tamanho
  */
  completeSequencesWithDash(
    fastaEntries: FastaEntry[]
  ): [FastaEntry[], number] {
    if (fastaEntries.length === 0) {
      return [[], 0];
    }

    const maxLength = Math.max(
      ...fastaEntries.map((entry) => entry.sequence.length)
    );
    const fastaEntriesAux = [];
    for (const entry of fastaEntries) {
      const diffLength = maxLength - entry.sequence.length;
      if (diffLength > 0) {
        entry.sequence += '.'.repeat(diffLength);
        //entry.sequence += " " + diffLength;
      }
      fastaEntriesAux.push(entry);
      //console.log("Nome: " + entry.name + "\n" + "SEQUENCE: \n" + entry.sequence);
    }
    fastaEntries = fastaEntriesAux;

    return [fastaEntries, maxLength];
  }
}
