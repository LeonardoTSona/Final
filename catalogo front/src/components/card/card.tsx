import "./card.css"
import { useState } from 'react'
import axios from 'axios';
import {UpdateProdutoModal} from "./modal/update-modal";
import { useQueryClient } from "@tanstack/react-query";

interface CardProps {
    codigo: string,
    nome: string,
    altura: number,
    largura: number,
    qntMinima: number
}

/**
 * Componente de cartão que representa um produto.
 * 
 * @param {CardProps} props - Propriedades do cartão, incluindo código, nome, altura, largura e quantidade mínima.
 */
export function Card({ codigo, nome, altura, largura, qntMinima }: CardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [produtoData] = useState({
        codigo,
        nome,
        altura,
        largura,
        qntMinima
    });

    /**
   * Abre ou fecha o modal de atualização do produto.
   */
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    /**
   * Deleta o produto do servidor e atualiza a lista de produtos.
   */
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/produto/${codigo}`);
            console.log('Produto deletado com sucesso!');
            onSuccessDelete();
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    /**
   * Atualiza a lista de produtos após a exclusão de um produto.
   */
    const queryClient = useQueryClient();
    const onSuccessDelete = () => {
        queryClient.invalidateQueries({queryKey: ['produto-data']})
    };

    // Renderização do componente
    return (
        <table className="card-table">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Altura (cm)</th>
                    <th>Largura (cm)</th>
                    <th>Quantidade Mínima</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{codigo}</td>
                    <td>{nome}</td>
                    <td>{altura}</td>
                    <td>{largura}</td>
                    <td>{qntMinima}</td>
                    <td className="button-actions">
                        <button className="button-update" onClick={handleOpenModal}>Atualizar</button>
                        <button className="button-delete" onClick={handleDelete}>Deletar</button>
                    </td>
                </tr>
            </tbody>
            {isModalOpen && (
                <UpdateProdutoModal
                    closeModal={handleOpenModal}
                    produtoData={produtoData}
                />
            )}
        </table>
    );
}