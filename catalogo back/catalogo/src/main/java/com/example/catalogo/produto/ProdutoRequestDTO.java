package com.example.catalogo.produto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

/**
 * Classe que representa uma requisição de criação ou atualização de um produto.
 */
public record ProdutoRequestDTO(
    @NotNull(message = "O código é obrigatório")
    @NotEmpty(message = "O código não pode estar vazio.")
    String codigo, 
    @NotNull(message = "O nome é obrigatório.")
    @NotEmpty(message = "O nome não pode estar vazio.")
    String nome, 
    Float altura, 
    Float largura, 
    Integer qntMinima) {
}
