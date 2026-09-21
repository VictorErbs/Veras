package com.studio.veras.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entidade de persistência dos leads captados pela landing page.
 */
@Data
@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "O nome é obrigatório")
    private String name;

    @NotBlank(message = "O telefone é obrigatório")
    private String phone;

    @Email(message = "Formato de e-mail inválido")
    private String email;

    @NotNull(message = "O consentimento da LGPD é obrigatório")
    @Column(name = "lgpd_consent")
    private Boolean lgpdConsent;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Converte string vazia enviada pelo frontend opcional para null, evitando falha no @Email
    public void setEmail(String email) {
        this.email = (email != null && email.trim().isEmpty()) ? null : email;
    }
}
