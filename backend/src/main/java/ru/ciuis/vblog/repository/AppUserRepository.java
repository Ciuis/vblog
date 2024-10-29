package ru.ciuis.vblog.repository;

import org.springframework.stereotype.Repository;
import ru.ciuis.vblog.model.AppUser;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
}
