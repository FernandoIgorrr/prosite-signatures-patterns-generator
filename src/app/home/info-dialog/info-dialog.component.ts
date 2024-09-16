import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  INFO =
  [
    {'titulo':'Modelos de pontuação de conservação','texto':`<p><strong>A classificação dos aminoácidos</strong> é uma abordagem simples para avaliar a conservação de<br />
              alinhamentos de proteínas. Nesse método, os aminoácidos são agrupados com base em suas<br />
              propriedades físicas e químicas, como carga elétrica, tamanho e hidrofobicidade.<br /><br /></p>
              Para usar a classificação dos aminoácidos na avaliação da conservação de alinhamentos de<br />
              proteínas, siga estes passos:<br /><br />
              <strong>1. Identificação dos grupos de aminoácidos:</strong> Primeiro, agrupe os aminoácidos do alinhamento<br />
              em categorias com base em suas propriedades. Por exemplo, você pode agrupar aminoácidos<br />
              carregados positivamente, carregados negativamente, hidrofóbicos, hidrofílicos, etc.<br /><br />
              <strong>2. Avaliação da conservação:</strong> Em seguida, examine cada posição no alinhamento e conte<br />
              quantos aminoácidos de cada grupo estão presentes nessa posição. Uma maior predominância<br />
              de um grupo particular em uma posição indica uma conservação de propriedades específicas<br />
              nessa posição.<br /><br />
              <strong>3. Interpretação:</strong> Com base na distribuição dos grupos de aminoácidos em diferentes posições<br />
              do alinhamento, você pode inferir quais regiões são mais conservadas em termos de suas<br />
              propriedades físicas e químicas.
      `},
      {'titulo':'Modelos de pontuação de conservação','texto':`<strong>A matriz BLOSUM</strong>  (<b>BLO</b>cks of Amino Acid <b>SU</b>bstitution <b>M</b>atrix) é uma matriz de<br />
                substituição usada para o alinhamento de sequências de proteínas. Matrizes<br />
                BLOSUM são usadas para pontuar alinhamentos entre sequências de proteínas<br />
                divergentes. Elas são baseadas em alinhamentos locais.<br />
                Ela atribui pontuações a pares de aminoácidos com base na frequência com que<br />
                ocorrem juntos em alinhamentos de proteínas homólogas.<br /><br />
                Para usar a matriz BLOSUM62 na avaliação da conservação de alinhamentos<br />
                de proteínas, você segue estes passos:<br /><br />
                <strong>1. Alinhamento de sequências: </strong> Primeiro, você alinha as sequências de proteínas que deseja <br />
                comparar usando um algoritmo como o BLAST ou o algoritmo de alinhamento múltiplo de<br />
                sequências.<br /><br />
                <strong>2. Atribuição de pontuações: </strong> Então, para cada posição no alinhamento, você olha para os<br />
                aminoácidos correspondentes nas diferentes sequências alinhadas. Usando a matriz<br />
                BLOSUM62, você atribui uma pontuação a esse par de aminoácidos. Pontuações mais altas<br />
                indicam uma maior conservação evolutiva.<br /><br />
                <strong>3. Avaliação da conservação:</strong> Com base nas pontuações atribuídas, você pode determinar quais<br />
                posições no alinhamento são mais conservadas (ou seja, têm aminoácidos mais semelhantes<br />
                entre as sequências) e quais são menos conservadas.
                 `},
    {'titulo':'Limite de sequencias sem conservação (X-Threshold)','texto':`<strong>O X-Threshold</strong> é útil para segmentar sequências longas que podem conter múltiplas instâncias de<br />
              um padrão Prosite. Ele permite que você identifique regiões distintas dentro da sequência que<br />
              correspondem a diferentes padrões ou motivos biológicos.<br /><br />
              Ao definir um threshold adequado, você pode controlar a sensibilidade da detecção de padrões e<br />
              segmentar as sequências de maneira mais precisa, facilitando a análise e interpretação dos<br />
              resultados.`}
  ];

  info_num : number;

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ){
    this.info_num = data;
  }



  onOkClick(): void {
    this.dialogRef.close();
  }
}
