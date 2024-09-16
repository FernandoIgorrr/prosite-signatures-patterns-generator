import { Aminoacid } from "./Aminoacid.model";

export class Protein{
  id: string;
  sequence: Aminoacid[];

  constructor(id : string, sequence: Aminoacid[]){
    this.id = id;
    this.sequence = sequence;
  }

  sequenceLetter(): string {
    let str = "";
    for (const amino of this.sequence){
        str += amino.l1;
    }
    return str;
  }
}
