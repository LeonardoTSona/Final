package com.example.catalogo.produto;

public record ProdutoResponseDTO(String codigo, String nome, Float altura, Float largura, Integer qntMinima) {
    public ProdutoResponseDTO(Produto produto){
        this(produto.getCodigo(), produto.getNome(), produto.getAltura(), produto.getLargura(), produto.getQntMinima());
    }
}
