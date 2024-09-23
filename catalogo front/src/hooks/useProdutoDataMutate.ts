import axios, { AxiosPromise } from "axios"
import { ProdutoData } from "../interface/ProdutoData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';

// URL base da API
const API_URL = 'http://localhost:8080';

// Função que realiza a requisição POST para criar um novo produto
async (data: ProdutoData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/produto', data);
    return response
}

// Hook que gerencia a mutação de dados de produtos
export function useProdutoDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: async (data: ProdutoData) => {
            try {
              // Verifica se o produto é uma atualização ou uma criação
              if (data.isUpdate) { // se o produto tiver um id, é uma atualização
                const response = await axios.put(API_URL + '/produto/' + data.codigo, data);
                return response.data;
              } else { // se não tiver id, é uma adição
                const response = await axios.post(API_URL + '/produto', data);
                return response.data;
              }
            } catch (error) {
              console.error(error);
              throw error;
            }
          },
      retry: 2,
      onSuccess: () => {
        // Invalida as consultas de dados de produtos para atualizar a lista
        queryClient.invalidateQueries({queryKey: ['produto-data']})
      },
      // Função que é executada quando a requisição falha
      onError: (error: any) => {
        // Verifica se o erro é um erro de resposta da API
        if (error.response?.data) {
          // Verifica se o erro é um erro de validação
          if (error.status === 400) {
            // Mostra o erro de validação como um toast
            const errorMessage = error.response.data.errors[0].defaultMessage;
            toast.error(errorMessage);
          }else{
            const errorMessage = error.response?.data;
            toast.error(errorMessage);
          }
        }
      },
    })
  
    // Retorna a função que realiza a mutação de dados de produtos
    return mutate;
  }