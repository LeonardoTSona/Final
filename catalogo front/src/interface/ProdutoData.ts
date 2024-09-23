// Interface que representa os dados de um produto
export interface ProdutoData{
    codigo: string,
    nome: string,
    altura: number,
    largura: number,
    qntMinima: number,
    // Indica se o produto está sendo atualizado
    isUpdate?: boolean
}