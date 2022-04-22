package com.juun.template.dao;

import com.juun.template.model.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityDao extends JpaRepository<Authority, String> {}
