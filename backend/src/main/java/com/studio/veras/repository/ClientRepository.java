package com.studio.veras.repository;

import com.studio.veras.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Operações de banco de dados para a entidade Client.
 */
@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
}
