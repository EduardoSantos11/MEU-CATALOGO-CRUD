
import React, { useState, useEffect } from 'react';
import { type ItemCatalogo } from '../types';
import Card from '../components/Card';
import Form from '../components/Form';
import { getItens, createItem, updateItem, deleteItem } from '../services/api';

const Home: React.FC = () => {
  
  const [itens, setItens] = useState<ItemCatalogo[]>([]);
  
  const [itemParaEditar, setItemParaEditar] = useState<ItemCatalogo | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  
  const fetchItens = async () => {
    setLoading(true);
    try {
      const data = await getItens();
      setItens(data);
    } catch (error) {
      console.error('Falha ao carregar itens:', error);
      alert('Erro ao conectar com o JSON Server. Verifique se ele está rodando na porta 3001!');
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchItens();
  }, []); 
  const handleSave = async (item: ItemCatalogo) => {
    try {
      if (item.id) { 
        await updateItem(item);
        alert(`Item "${item.titulo}" atualizado com sucesso!`);
      } else { 
        const novoItem = await createItem(item); 
        alert(`Item "${novoItem.titulo}" cadastrado com sucesso!`);
      }
      setItemParaEditar(null); 
      fetchItens(); 
    } catch (error) {
      console.error('Falha ao salvar item:', error);
      alert('Erro ao salvar item. Tente novamente.');
    }
  };

  
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este item?')) {
      try {
        await deleteItem(id);
        alert('Item removido com sucesso!');
        fetchItens(); 
      } catch (error) {
        console.error('Falha ao deletar item:', error);
        alert('Erro ao deletar item. Tente novamente.');
      }
    }
  };

  
  const handleEdit = (item: ItemCatalogo) => {
    setItemParaEditar(item); 
  };

 
  return (
    <div className="home-container">
      {}
      <div className="form-section">
        <Form
          itemParaEditar={itemParaEditar}
          onSave={handleSave}
          onCancel={() => setItemParaEditar(null)} 
        />
      </div>
      
      <hr />

      {}
      <div className="list-section">
        <h2>📚 Minha Coleção ({itens.length} itens)</h2>
        
        {loading && <p>Carregando itens...</p>}
        
        {!loading && itens.length === 0 && <p>Nenhum item encontrado. Cadastre o primeiro!</p>}

        <div className="catalogo-grid">
          {itens.map((item) => (
            <Card
              key={item.id} 
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

