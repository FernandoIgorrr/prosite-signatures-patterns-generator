export interface AminoacidColorMap{

  readonly COLOR_MAP: { [key: string]: string };
  readonly COLOR_MAP_HEX: { [key: string]: string };
  readonly NON_COLOR_MAP_HEX: { [key: string]: string };
}

export const aminoacidColorMap: AminoacidColorMap = {

  COLOR_MAP: {
  'A': 'blue',
  'I': 'blue',
  'L': 'blue',
  'M': 'blue',
  'F': 'blue',
  'W': 'blue',
  'V': 'blue',

  'K': 'red',
  'R': 'red',

  'E': 'magenta',
  'D': 'magenta',

  'N': 'green',
  'Q': 'green',
  'S': 'green',
  'T': 'green',

  'C': 'pink',

  'G': 'orange',

  'P': 'yellow',

  'H': 'cyan',
  'Y': 'cyan',

  '-': 'gray',
  '.': 'gray',
  },

  COLOR_MAP_HEX: {
  'A': '#197FE5',
  'I': '#197FE5',
  'L': '#197FE5',
  'M': '#197FE5',
  'F': '#197FE5',
  'W': '#197FE5',
  'V': '#197FE5',


  'K': '#f01505',
  'R': '#f01505',

  'E': '#c048c0',
  'D': '#c048c0',

  'N': '#15c015',
  'Q': '#15c015',
  'S': '#15c015',
  'T': '#15c015',

  'C': '#f08080',

  'G': '#f09048',

  'P': '#c0c000',

  'H': '#15a4a4',
  'Y': '#15a4a4',

  '-': '#303030',
  '.': '#303030',
  },

  NON_COLOR_MAP_HEX: {
  'A': '#303030',
  'I': '#303030',
  'L': '#303030',
  'M': '#303030',
  'F': '#303030',
  'W': '#303030',
  'V': '#303030',
  'C': '#303030',

  'K': '#303030',
  'R': '#303030',

  'E': '#303030',
  'D': '#303030',

  'N': '#303030',
  'Q': '#303030',
  'S': '#303030',
  'T': '#303030',

  'G': '#303030',

  'P': '#303030',

  'H': '#303030',
  'Y': '#303030',

  '-': '#303030',
  '.': '#303030',
  }
}
