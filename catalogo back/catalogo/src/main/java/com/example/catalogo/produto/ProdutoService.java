package com.example.catalogo.produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository; // Repositório para acessar o banco de dados

    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto obterPorCodigo(String codigo) {
        Optional<Produto> produto = produtoRepository.findById(codigo);
        return produto.orElse(null); // Retorna o produto ou null se não existir
    }

    public Produto obterPorNome(String nome) {
        Optional<Produto> produto = produtoRepository.findByNome(nome);
        return produto.orElse(null); // Método a ser implementado no repositório
    }

    public Produto atualizar(String codigo, ProdutoRequestDTO produtoRequest) {
        Produto produtoExistente = obterPorCodigo(codigo);
        if (produtoExistente != null) {
            produtoExistente.setNome(produtoRequest.nome());
            produtoExistente.setAltura(produtoRequest.altura());
            produtoExistente.setLargura(produtoRequest.largura());
            produtoExistente.setQntMinima(produtoRequest.qntMinima());
            return produtoRepository.save(produtoExistente);
        }
        return null; // Retorna null se o produto não existir
    }

    public boolean deletar(String codigo) {
        if (produtoRepository.existsById(codigo)) {
            produtoRepository.deleteById(codigo);
            return true;
        }
        return false; // Retorna false se o produto não existir
    }
}