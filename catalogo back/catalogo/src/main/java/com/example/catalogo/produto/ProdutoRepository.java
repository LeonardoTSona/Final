package com.example.catalogo.produto;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, String>{
    Optional<Produto> findByCodigo(String codigo);
    Optional<Produto> findByNome(String nome);
    
    // @Query("SELECT p FROM Produto p WHERE p.codigo = :codigo OR p.nome = :nome")
    // Optional<Produto> findByCodigoOrNome(@Param("codigo") String codigo, @Param("nome") String nome);


    // @Query("SELECT COUNT(c) > 0 FROM Produto p WHERE p.codigo =: codigo AND p.nome =: nome")
    // boolean findByIdAndNome(@Param("codigo")String codigo, @Param("nome")String nome);

}
