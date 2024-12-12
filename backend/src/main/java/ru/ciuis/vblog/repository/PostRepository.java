package ru.ciuis.vblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.Post;

import java.util.Optional;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Set<Post>> findByAuthor(AppUser author);
}
