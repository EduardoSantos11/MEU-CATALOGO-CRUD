
import React, { useState } from 'react';
import { type ItemCatalogo } from '../types';


interface FormProps {
  itemParaEditar: ItemCatalogo | null; 
  onSave: (item: ItemCatalogo) => void;
  onCancel: () => void;
}


const initialItem: Omit<ItemCatalogo, 'id'> = {
  titulo: '',
  tipo: 'Série', 
  nota: 1,
  resumo: '',
  assistido: false,
  capaUrl: '', 
};



const Form: React.FC<FormProps> = ({ itemParaEditar, onSave, onCancel }) => {
 
  const [formData, setFormData] = useState<Omit<ItemCatalogo, 'id'> | ItemCatalogo>(
    itemParaEditar || initialItem
  );


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | number | boolean = value;

    if (type === 'number') {
      newValue = parseInt(value);
    } else if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave(formData as ItemCatalogo); 
    setFormData(initialItem); 
  };

  
  return (
    <form onSubmit={handleSubmit} className="form-catalogo">
      <h3>{itemParaEditar ? '✏️ Editar Item' : '➕ Novo Cadastro'}</h3>
      
      {}
      <label>Título:</label>
      <input
        type="text"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        required
      />

      {}
      <label>Tipo:</label>
      <select name="tipo" value={formData.tipo} onChange={handleChange} required>
        <option value="Série">Série</option>
        <option value="Filme">Filme</option>
      </select>

      {}
      <label>Nota (1 a 5):</label>
      <input
        type="number"
        name="nota"
        value={formData.nota}
        onChange={handleChange}
        min="1"
        max="5"
        required
      />

      {}
      <label>Resumo:</label>
      <textarea
        name="resumo"
        value={formData.resumo}
        onChange={handleChange}
        rows={3}
      />

      {}
      <label className="checkbox-label">
        <input
          type="checkbox"
          name="assistido"
          checked={formData.assistido}
          onChange={handleChange}
        />
        Já assisti
      </label>

      {}
      <div className="form-actions">
        <button type="submit" className="btn-save">
          {itemParaEditar ? 'Salvar Edição' : 'Cadastrar'}
        </button>
        {itemParaEditar && ( 
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;

