package com.example.catalogo.produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Serviço responsável por gerenciar produtos.
 * 
 * Essa classe fornece métodos para salvar, listar, obter e atualizar produtos.
 */
@Service
public class ProdutoService {

    // Injeção de dependência do repositório de produtos
    @Autowired
    private ProdutoRepository produtoRepository;

    /**
     * Salva um produto no banco de dados.
     */
    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    /**
     * Lista todos os produtos cadastrados no banco de dados.
     */
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    /**
     * Obtém um produto pelo código.
     */
    public Produto obterPorCodigo(String codigo) {
        Optional<Produto> produto = produtoRepository.findById(codigo);
        return produto.orElse(null); // Retorna o produto ou null se não existir
    }

    /**
     * Obtém um produto pelo nome.
     */
    public Produto obterPorNome(String nome) {
        Optional<Produto> produto = produtoRepository.findByNome(nome);
        return produto.orElse(null); // Método a ser implementado no repositório
    }

    /**
     * Atualiza um produto existente no banco de dados.
     * 
     * @param produtoRequest Os dados do produto a ser atualizado
     */
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

    /**
     * Deleta um produto do banco de dados.
     * 
     * @param codigo O código do produto a ser deletado
     * @return True se o produto foi deletado, false se não existir
     */
    public boolean deletar(String codigo) {
        if (produtoRepository.existsById(codigo)) {
            produtoRepository.deleteById(codigo);
            return true;
        }
        return false;
    }
}