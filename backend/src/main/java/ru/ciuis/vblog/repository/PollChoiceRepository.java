package ru.ciuis.vblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.ciuis.vblog.model.PollChoice;

@Repository
public interface PollChoiceRepository extends JpaRepository<PollChoice, Long> {

}
