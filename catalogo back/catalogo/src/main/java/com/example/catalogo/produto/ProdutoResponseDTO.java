package com.example.catalogo.produto;

/**
 * Classe que representa uma resposta de produto, contendo apenas as informações necessárias para a apresentação.
 */
public record ProdutoResponseDTO(
    String codigo,
    String nome,
    Float altura,
    Float largura,
    Integer qntMinima
) {
    /**
     * Construtor que cria uma instância de ProdutoResponseDTO a partir de um objeto Produto.
     * 
     * @param produto O objeto Produto que será utilizado para criar a resposta.
     */
    public ProdutoResponseDTO(Produto produto){
        this(produto.getCodigo(), produto.getNome(), produto.getAltura(), produto.getLargura(), produto.getQntMinima());
    }
}

