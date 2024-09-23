import { useState } from 'react'
import './App.css'
import { useProdutoData } from './hooks/useProdutoData';
import { CreateModal } from './components/card/modal/create-modal';
import ProdutoTable from './components/card/produto-table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Componente principal da aplicação.
 *
 * Este componente é responsável por gerenciar o estado da aplicação
 * e renderizar a interface do usuário.
 */
function App() {
  /**
   * Estado para controlar se o modal de criação de produto está aberto.
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useProdutoData();

  // Função para abrir o modal de criação de produto.
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal de criação de produto.
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Se a aplicação estiver carregando, retorna uma mensagem de loading.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Se a aplicação estiver com erro, retorna uma mensagem de erro.
  if (error) {
    return <div>Error: {error.message}</div>;
  }

// Renderiza a interface do usuário.
  return (
    <div className="container">
      <h1>Catálogo</h1>
      <div className="produto-lista">
      {data && <ProdutoTable produtos={data} />}
      </div>
      {isModalOpen && <CreateModal closeModal={handleCloseModal} />}
      <ToastContainer />
      <button className="button-add" onClick={handleOpenModal}>
        Adicionar Produto
      </button>
    </div>
  );
}

export default App;