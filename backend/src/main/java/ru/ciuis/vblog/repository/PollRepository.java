package ru.ciuis.vblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.ciuis.vblog.model.Poll;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {

}
