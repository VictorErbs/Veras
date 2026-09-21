package com.studio.veras;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * Ponto de partida do servidor Spring Boot da API do Studio Renata Veras.
 * Inicializa o contexto da aplicação, componentes injetados e configurações de banco de dados.
 */
@SpringBootApplication
public class VerasApplication {

    public static void main(String[] args) {
        loadDotEnv();
        SpringApplication.run(VerasApplication.class, args);
    }

    /**
     * Carrega variáveis de ambiente de arquivos .env locais (caso existam)
     * para facilitar o desenvolvimento sem commitar segredos no Git.
     */
    private static void loadDotEnv() {
        List<Path> possiblePaths = List.of(
            Paths.get(".env"),
            Paths.get("backend", ".env"),
            Paths.get("..", ".env")
        );

        for (Path path : possiblePaths) {
            if (Files.exists(path) && !Files.isDirectory(path)) {
                try {
                    List<String> lines = Files.readAllLines(path);
                    for (String line : lines) {
                        String trimmed = line.trim();
                        if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                            continue;
                        }
                        int eqIdx = trimmed.indexOf('=');
                        if (eqIdx > 0) {
                            String key = trimmed.substring(0, eqIdx).trim();
                            String value = trimmed.substring(eqIdx + 1).trim();
                            if (System.getenv(key) == null && System.getProperty(key) == null) {
                                System.setProperty(key, value);
                            }
                        }
                    }
                    break;
                } catch (IOException ignored) {
                }
            }
        }
    }
}
