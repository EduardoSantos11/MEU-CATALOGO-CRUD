
export interface ItemCatalogo {
  id: number;
  titulo: string;
  tipo: 'Série' | 'Filme'; 
  nota: number; 
  resumo: string;
  assistido: boolean; 
}



export interface ItemCatalogo {
  id: number;
  titulo: string;
  tipo: 'Série' | 'Filme';
  nota: number;
  resumo: string;
  assistido: boolean;
  capaUrl: string; 
}