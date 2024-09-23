package com.example.catalogo.produto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Table(name = "produtos")
@Entity(name = "produtos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "codigo")
public class Produto {
    @Id
    private String codigo;
    private String nome;
    private Float altura;
    private Float largura;
    private Integer qntMinima;

        public Produto(ProdutoRequestDTO data){
            this.codigo = data.codigo();
            this.nome = data.nome();
            this.altura = data.altura();
            this.largura = data.largura();
            this.qntMinima = data.qntMinima();
        }
}
