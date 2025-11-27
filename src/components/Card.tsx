
import React from 'react';
import { type ItemCatalogo } from '../types'; 


interface CardProps {
  item: ItemCatalogo;
  onEdit: (item: ItemCatalogo) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ item, onEdit, onDelete }) => {
  const notaEstrelas = '⭐'.repeat(item.nota); 

  return (
    <div className={`card ${item.tipo === 'Filme' ? 'card-filme' : 'card-serie'}`}>
      
      {}
      <img src={item.capaUrl} alt={`Capa de ${item.titulo}`} className="card-capa" />

      <div className="card-content">
        <h3 title={item.titulo}>{item.titulo}</h3>
        
        <p className="card-meta">
          {}
          <span className="card-type">{item.tipo}</span>
          <span className="card-rating">{notaEstrelas} ({item.nota}/5)</span>
        </p>

        {}
        
        <p className={`status ${item.assistido ? 'assistido' : 'nao-assistido'}`}>
          {item.assistido ? '✅ Assistido' : '⏳ Pendente'}
        </p>
        
        <div className="card-actions">
          <button className="btn-edit btn-compact" onClick={() => onEdit(item)}>
            Editar
          </button>
          <button className="btn-delete btn-compact" onClick={() => onDelete(item.id)}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;