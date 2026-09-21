package com.studio.veras;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Ponto de partida do servidor Spring Boot da API do Studio Renata Veras.
 * Inicializa o contexto da aplicação, componentes injetados e configurações de banco de dados.
 */
@SpringBootApplication
public class VerasApplication {

    public static void main(String[] args) {
        SpringApplication.run(VerasApplication.class, args);
    }
}
