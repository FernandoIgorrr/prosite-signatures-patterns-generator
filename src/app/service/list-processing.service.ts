import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListProcessingService {

  constructor() { }

  findMostFrequentElement<T>(list: T[]): T | null
  {
    if (list.length === 0) {
      return null;
    }

    const frequencyMap: { [key: string]: number } = {};
    let mostFrequentElement: T = list[0];
    let maxCount = 0;

    for (const element of list) {
        const key = JSON.stringify(element); // Para lidar com objetos e arrays como chaves
        if (frequencyMap[key] !== undefined) {
            frequencyMap[key]++;
        } else {
            frequencyMap[key] = 1;
        }

        if (frequencyMap[key] > maxCount) {
            maxCount = frequencyMap[key];
            mostFrequentElement = element;
        }
    }

    return mostFrequentElement;
  }
}
