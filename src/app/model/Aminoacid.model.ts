import { BlossumMatrix62, SubstitutionScoreMatrix } from "./SubstitutionScoreMatrix.model";

export class Aminoacid {
  name: string;
  l1: L1;
  l3: L3;
  classification: Classification;

  constructor(name: string, l1: L1, l3: L3, classification: Classification) {
      this.name = name;
      this.l1 = l1;
      this.l3 = l3;
      this.classification = classification;
  }

  /*
  Função para instanciar um amoniácido de acordo com sua letra representante.
  */
  static getAminoacid(letter: string | null): Aminoacid {
      if (letter === null)
        return AMINOACIDS.find((aminoacid) => aminoacid.l1 === '0') || new Aminoacid('Gap',L1.NONE,L3.NONE ,Classification.NONE);

      const aminoacidFound = AMINOACIDS.find((aminoacid) => aminoacid.l1 === letter);
      return aminoacidFound || new Aminoacid('Gap',L1.gap_dot,L3.gap_dot,Classification.NONE);
  }

  public equals (aminoacid : Aminoacid) : boolean {
    return this.l1 === aminoacid.l1 && this.l3 === aminoacid.l3 && this.name === aminoacid.name && this.classification === aminoacid.classification;
  }
 /*
    Método de comparação de conservação de aminoácido de acordo com sua classificação.
  */
  public equalsClassification (aminoacid : Aminoacid) : boolean{
    return this.classification === aminoacid.classification;
  }

  /*
    Método de comparação de conservação de aminoácido de acordo com os padrões:
    1 - Matriz Blossum 62;
    2 - cujo Score seja maior igual a 1.
  */
  public equalsSubstitutionMatrixBlossum62_1(aminoaic : Aminoacid) : boolean {
    return this.substitutionValidation(aminoaic,BlossumMatrix62,1);
  }

  /*
    Método para retorna o score de conservação dos aminoácidos em questão, dada uma matriz de substituição.
  */

  public substitutionScore (aminoaic : Aminoacid, matrix : SubstitutionScoreMatrix) : number{
    return matrix[this.l1][aminoaic.l1];
  }
  /*
    Método de comparação de conservação de aminoácido com matrzies blossum generalizada:
    você escolhe a matriz e o threshold para o score.
  */
  public substitutionValidation (aminoaic : Aminoacid, matrix : SubstitutionScoreMatrix, substitution_score_threshold : number) : boolean{
    return this.substitutionScore(aminoaic,matrix) >= substitution_score_threshold;
  }

  public showAminoacid() : string{
      return `Nome : ${this.name} | Símbolo : ${this.l1} | Iniciais : ${this.l3} | Classificação : ${this.classification}`;
  }
}

enum L1 {
  A = 'A',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  T = 'T',
  V = 'V',
  W = 'W',
  Y = 'Y',
  NONE = '0',
  gap_dot = '.',
  gap_hifen = '-'
}

enum L3 {
  ALA = 'Ala',
  CYS = 'Cys',
  ASP = 'Asp',
  GLU = 'Glu',
  PHE = 'Phe',
  GLY = 'Gly',
  HIS = 'His',
  ILE = 'Ile',
  LYS = 'Lys',
  LEU = 'Leu',
  MET = 'Met',
  ASN = 'Asn',
  PRO = 'Pro',
  GLN = 'Gln',
  ARG = 'Arg',
  SER = 'Ser',
  THR = 'Thr',
  VAL = 'Val',
  TRP = 'Trp',
  TYR = 'Tyr',
  NONE = '0',
  gap_dot = '.',
  gap_hifen = '-'
}

enum Classification {
  HYDROFOBIC = 'hydrofobic',
  NONPOLAR_ALIPHATIC = 'Nonpolar, aliphatic',
  AROMATIC = 'aromatic',
  POLAR_UNCHARGED = 'polar, uncharged',
  POSITIVELY_CHARGED = 'positivaly, charged',
  NEGATIVELY_CHARGED = 'negatively, charged',

  CYSTEINES = 'cysteines',
  GLYCINES = 'Glycines',
  PROLINES = 'prolines',

  NONE = 'none'
}

const AMINOACIDS: Aminoacid[] = [
  new Aminoacid('Alanine', L1.A, L3.ALA, Classification.HYDROFOBIC),
  new Aminoacid('Isoleucine', L1.I, L3.ILE, Classification.HYDROFOBIC),
  new Aminoacid('Leucine', L1.L, L3.LEU, Classification.HYDROFOBIC),
  new Aminoacid('Methionine', L1.M, L3.MET, Classification.HYDROFOBIC),
  new Aminoacid('Phenylalanine', L1.F, L3.PHE, Classification.HYDROFOBIC),
  new Aminoacid('Tryptophan', L1.W, L3.TRP, Classification.HYDROFOBIC),
  new Aminoacid('Valine', L1.V, L3.VAL, Classification.HYDROFOBIC),


  new Aminoacid('Lysine', L1.K, L3.LYS, Classification.POSITIVELY_CHARGED),
  new Aminoacid('Arginine', L1.R, L3.ARG, Classification.POSITIVELY_CHARGED),


  new Aminoacid('Glutamate', L1.E, L3.GLU, Classification.NEGATIVELY_CHARGED),
  new Aminoacid('Aspartate', L1.D, L3.ASP, Classification.NEGATIVELY_CHARGED),


  new Aminoacid('Asparagine', L1.N, L3.ASN, Classification.POLAR_UNCHARGED),
  new Aminoacid('Glutamine', L1.Q, L3.GLN, Classification.POLAR_UNCHARGED),
  new Aminoacid('Serine', L1.S, L3.SER, Classification.POLAR_UNCHARGED),
  new Aminoacid('Threonine', L1.T, L3.THR, Classification.POLAR_UNCHARGED),


  new Aminoacid('Cysteine', L1.C, L3.CYS, Classification.CYSTEINES),


  new Aminoacid('Glycine', L1.G, L3.GLY, Classification.GLYCINES),


  new Aminoacid('Proline', L1.P, L3.PRO, Classification.PROLINES),


  new Aminoacid('Histidine', L1.H, L3.HIS, Classification.AROMATIC),
  new Aminoacid('Tyrosine', L1.Y, L3.TYR, Classification.AROMATIC),

  new Aminoacid('None', L1.NONE, L3.NONE, Classification.NONE),
  new Aminoacid('Gap', L1.gap_dot, L3.gap_dot, Classification.NONE),
  new Aminoacid('Gap', L1.gap_hifen, L3.gap_hifen, Classification.NONE)
];
