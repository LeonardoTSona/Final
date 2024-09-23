import React, { useState } from 'react';
import { ProdutoData } from '../../interface/ProdutoData';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UpdateProdutoModal } from './modal/update-modal';
import './produto-table.css';

/**
 * Interface para os props da tabela de produtos.
 */
interface ProdutoTableProps {
  produtos: ProdutoData[];
}

/**
 * Componente que renderiza a tabela de produtos.
 */
const ProdutoTable: React.FC<ProdutoTableProps> = ({ produtos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoData | null>(null);

   /**
   * Função para abrir o modal de atualização com o produto selecionado.
   */
  const handleOpenModal = (produto: ProdutoData) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  /**
   * Função para fechar o modal de atualização.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const queryClient = useQueryClient();

   /**
   * Função para invalidar as queries de produtos após exclusão.
   */
  const onSuccessDelete = () => {
    queryClient.invalidateQueries({ queryKey: ['produto-data'] });
  };

  /**
   * Função para excluir um produto.
   * @param codigo Código do produto a ser excluído.
   */
  const handleDelete = async (codigo: string) => {
    try {
      await axios.delete(`http://localhost:8080/produto/${codigo}`);
      console.log('Produto deletado com sucesso!');
      onSuccessDelete();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    
    <div className='teste'>
    <table className="table-produto">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Altura</th>
          <th>Largura</th>
          <th>Quantidade Mínima</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.codigo}>
            <td>{produto.codigo}</td>
            <td>{produto.nome}</td>
            <td>{produto.altura} m</td>
            <td>{produto.largura} m</td>
            <td>{produto.qntMinima}</td>
            <td>
              <div className="button-actions">
                <button className="button-update" onClick={() => handleOpenModal(produto)}>Atualizar</button>
                <button className="button-delete" onClick={() => handleDelete(produto.codigo)}>Deletar</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        {isModalOpen && produtoSelecionado && (
        <UpdateProdutoModal
            closeModal={handleCloseModal}
            produtoData={produtoSelecionado}
        />
        )}
    </div>
  );
};

export default ProdutoTable;