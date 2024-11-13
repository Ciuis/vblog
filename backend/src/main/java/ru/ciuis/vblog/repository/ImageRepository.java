package ru.ciuis.vblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ru.ciuis.vblog.model.Image;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByImageName(String imageName);
}
