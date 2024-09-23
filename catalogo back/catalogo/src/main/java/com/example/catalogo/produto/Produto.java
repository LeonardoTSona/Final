package com.example.catalogo.produto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Tabela que armazena os produtos no banco de dados.
 */
@Table(name = "produtos")

/**
 * Entidade que representa um produto no banco de dados.
 */
@Entity(name = "produtos")

/**
 * Classe que representa um produto.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "codigo")
public class Produto {

    /**
     * Código único do produto.
     */
    @Id
    private String codigo;
    
    private String nome;

    private Float altura;
    
    private Float largura;

    private Integer qntMinima;

    /**
     * Construtor que cria um produto a partir de um objeto ProdutoRequestDTO.
     */
    public Produto(ProdutoRequestDTO data){
        this.codigo = data.codigo();
        this.nome = data.nome();
        this.altura = data.altura();
        this.largura = data.largura();
        this.qntMinima = data.qntMinima();
    }
}