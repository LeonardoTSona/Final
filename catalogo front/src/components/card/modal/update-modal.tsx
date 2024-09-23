import { useEffect, useState } from 'react';
import './modal.css';
import { useProdutoDataMutate } from "../../../hooks/useProdutoDataMutate";
import { ProdutoData } from "../../../interface/ProdutoData";

// Definindo as propriedades que a componente `UpdateProdutoModal` recebe
interface InputProps {
  label: string;
  value: string | number;
  updateValue: (value: any) => void;
}

// Definindo as propriedades que a componente `UpdateProdutoModal` recebe
interface ModalProps {
  closeModal(): void;
  produtoData: ProdutoData;
}

// Componente que renderiza um campo de entrada com um rótulo
const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input value={value} onChange={event => updateValue(event.target.value)} readOnly={label === 'Código'}></input>
    </>
  );
};

// Componente que renderiza um modal de atualização de produto
export function UpdateProdutoModal({ produtoData, closeModal }: ModalProps) {

  // Inicializando os estados com os valores iniciais do produto
  const [codigo, setCodigo] = useState(produtoData.codigo);
  const [nome, setNome] = useState(produtoData.nome);
  const [altura, setAltura] = useState(produtoData.altura);
  const [largura, setLargura] = useState(produtoData.largura);
  const [qntMinima, setQntMinima] = useState(produtoData.qntMinima);

  // Obtendo a função de mutação e os estados de sucesso e pendência do hook `useProdutoDataMutate`
  const { mutate, isSuccess, isPending } = useProdutoDataMutate();

  // Função que envia os dados do produto para a API
  const submit = () => {
    const produtoData: ProdutoData = {
      codigo,
      nome,
      altura,
      largura,
      qntMinima,
      isUpdate: true,
    };
    mutate(produtoData);
  };

  // Efeito que fecha o modal quando a mutação é bem-sucedida
  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [isSuccess]);

  // Renderizando o componente
  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Atualizar produto</h2>
        <form className="input-container">
          <Input label="Código" value={codigo} updateValue={setCodigo} />
          <Input label="Nome do produto" value={nome} updateValue={setNome} />
          <Input label="Altura" value={altura} updateValue={setAltura} />
          <Input label="Largura" value={largura} updateValue={setLargura} />
          <Input label="Quantidade Mínima" value={qntMinima} updateValue={setQntMinima} />
        </form>
        <div className="btn-container">
          <button onClick={submit} className="btn-secondary-submit">
            {isPending ? 'Atualizando...' : 'Atualizar'}
          </button>
          <button onClick={closeModal} className="btn-secondary-cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}