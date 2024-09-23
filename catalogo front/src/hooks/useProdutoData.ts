import axios, { AxiosPromise } from "axios"
import { ProdutoData } from "../interface/ProdutoData";
import { useQuery } from "@tanstack/react-query";

// Define a URL base da API
const API_URL = 'http://localhost:8080';

// Função que busca os dados de produtos da API
const fetchData = async (): AxiosPromise<ProdutoData[]> => {
    // Realiza uma requisição GET para a rota /produto da API
    const response = axios.get(API_URL + '/produto');
    return response
}

// Hook que fornece os dados de produtos e gerencia a busca
export function useProdutoData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['produto-data'],
        retry: 2
    })

    return{
        ...query,
        // Dados de produtos retornados pela API
        data: query.data?.data
    }
}