package com.example.catalogo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.catalogo.produto.Produto;
import com.example.catalogo.produto.ProdutoRequestDTO;
import com.example.catalogo.produto.ProdutoService;

import jakarta.validation.Valid;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<String> criarProduto(@Valid @RequestBody ProdutoRequestDTO produtoRequest) {
        // Verifica se o produto já existe pelo código
        if (produtoService.obterPorCodigo(produtoRequest.codigo()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("O código já está em uso.");
        }
        
        // Verifica se o produto já existe pelo nome
        if (produtoService.obterPorNome(produtoRequest.nome()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("O nome já está em uso.");
        }

        Produto produto = new Produto(produtoRequest);
        produtoService.salvar(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Produto criado com sucesso.");
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> produtos = produtoService.listarTodos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<Produto> obterProduto(@PathVariable String codigo) {
        Produto produto = produtoService.obterPorCodigo(codigo);
        return produto != null ? ResponseEntity.ok(produto) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<String> atualizarProduto(@PathVariable String codigo, @RequestBody ProdutoRequestDTO produtoRequest) {
        // Verifica se o produto já existe pelo nome
        if (produtoService.obterPorNome(produtoRequest.nome()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("O nome já está em uso.");
        }
        produtoService.atualizar(codigo, produtoRequest);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Produto atualizado com sucesso.");
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<String> deletarProduto(@PathVariable String codigo) {
        if (produtoService.deletar(codigo)) {
            return ResponseEntity.ok("Produto deletado com sucesso."); // Mensagem de sucesso
        } else {
            return ResponseEntity.ok("Produto não encontrado com esse Código.");
        }
    }
}
