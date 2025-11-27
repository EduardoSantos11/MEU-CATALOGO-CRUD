
import { type ItemCatalogo } from '../types';

const API_URL = 'http://localhost:3001/filmesSeries';


export const getItens = async (): Promise<ItemCatalogo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar a lista de itens.');
  }
  return response.json();
};


export const createItem = async (novoItem: Omit<ItemCatalogo, 'id'>): Promise<ItemCatalogo> => {
    
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(novoItem),
  });
  if (!response.ok) {
    throw new Error('Erro ao cadastrar novo item.');
  }
  return response.json();
};


export const updateItem = async (itemAtualizado: ItemCatalogo): Promise<ItemCatalogo> => {
   
  const response = await fetch(`${API_URL}/${itemAtualizado.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemAtualizado),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar item.');
  }
  return response.json();
};


export const deleteItem = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar item.');
  }
  
};