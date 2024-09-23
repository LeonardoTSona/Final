import { useEffect, useState } from "react"
import { useProdutoDataMutate } from "../../../hooks/useProdutoDataMutate";
import { ProdutoData } from "../../../interface/ProdutoData";

import "./modal.css";

// Interface para props do componente Input
interface InputProps {
    label: string;
    value: string | number;
    /**
     * Função para atualizar o valor do input
     */
    updateValue(value: any): void;
  }
  
  // Interface para props do componente CreateModal
  interface ModalProps {
    /**
     * Função para fechar o modal
     */
    closeModal(): void;
  }
  
  // Componente Input
  const Input = ({ label, value, updateValue }: InputProps) => {
    return (
      <>
        <label>{label}</label>
        <input value={value} onChange={event => updateValue(event.target.value)}></input>
      </>
    );
  };
  
  // Componente CreateModal
  export function CreateModal({ closeModal }: ModalProps) {
    // Estados para armazenar os valores dos inputs
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [altura, setAltura] = useState(0);
    const [largura, setLargura] = useState(0);
    const [qntMinima, setQntMinima] = useState(0);
  
    // Hook para realizar a mutação de dados de produto
    const { mutate, isSuccess, isPending } = useProdutoDataMutate();
  
    // Função para submeter os dados do formulário
    const submit = () => {
      // Criação do objeto de dados de produto
      const produtoData: ProdutoData = {
        codigo,
        nome,
        altura,
        largura,
        qntMinima,
        isUpdate: false,
      };
      // Realização da mutação de dados de produto
      mutate(produtoData);
    };
  
    // Efeito para fechar o modal após a mutação ser bem-sucedida
    useEffect(() => {
      if (!isSuccess) return;
      closeModal();
    }, [isSuccess]);

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo produto</h2>
                <form className="input-container">
                    <Input label="Código *" value={codigo} updateValue={setCodigo}/>
                    <Input label="Nome do produto *" value={nome} updateValue={setNome}/>
                    <Input label="Altura" value={altura} updateValue={setAltura}/>
                    <Input label="Largura" value={largura} updateValue={setLargura}/>
                    <Input label="Quantidade Mínima" value={qntMinima} updateValue={setQntMinima}/>
                </form>
                <div className="btn-container">
                    <button onClick={submit} className="btn-secondary-submit">
                        {isPending ? 'Postando...' : 'Postar'}
                    </button>
                    <button onClick={closeModal} className="btn-secondary-cancel">
                        Cancelar
                    </button>
                </div>
            </div>

        </div>
    )
}