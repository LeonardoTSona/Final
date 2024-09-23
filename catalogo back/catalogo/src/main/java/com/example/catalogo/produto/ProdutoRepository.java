package com.example.catalogo.produto;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, String> {

    /**
     * Busca um produto pelo código.
     */
    Optional<Produto> findByCodigo(String codigo);

    /**
     * Busca um produto pelo nome.
     */
    Optional<Produto> findByNome(String nome);
}
