package com.studio.veras.controller;

import com.studio.veras.model.Client;
import com.studio.veras.repository.ClientRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Endpoints REST para cadastro e consulta de clientes.
 */
@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    // Cadastro de novo lead a partir da landing page
    @PostMapping
    public ResponseEntity<Client> createClient(@Valid @RequestBody Client client) {
        if (!Boolean.TRUE.equals(client.getLgpdConsent())) {
            return ResponseEntity.badRequest().build();
        }
        Client saved = clientRepository.save(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Listagem para o painel administrativo (requer autenticação Basic Auth)
    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return ResponseEntity.ok(clientRepository.findAll());
    }
}
