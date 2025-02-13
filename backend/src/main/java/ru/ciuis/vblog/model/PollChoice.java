package ru.ciuis.vblog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="poll_choices")
public class PollChoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="poll_choice_id")
    private Long pollChoiceId;

    @ManyToOne
    @JoinColumn(name="poll_id")
    @JsonIgnore
    private Poll poll;

    @Column(name="poll_choice_text")
    private String choiceText;

    @OneToMany
    private Set<AppUser> votes;

    public PollChoice() {
    }

    public PollChoice(Long pollChoiceId, Poll poll, String choiceText, Set<AppUser> votes) {
        this.pollChoiceId = pollChoiceId;
        this.poll = poll;
        this.choiceText = choiceText;
        this.votes = votes;
    }

    public Long getPollChoiceId() {
        return pollChoiceId;
    }

    public void setPollChoiceId(Long pollChoiceId) {
        this.pollChoiceId = pollChoiceId;
    }

    public Poll getPoll() {
        return poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }

    public String getChoiceText() {
        return choiceText;
    }

    public void setChoiceText(String pollText) {
        this.choiceText = pollText;
    }

    public Set<AppUser> getVotes() {
        return votes;
    }

    public void setVotes(Set<AppUser> votes) {
        this.votes = votes;
    }

    @Override
    public String toString() {
        return "PollChoice{" +
                "pollChoiceId=" + pollChoiceId +
                ", poll=" + poll.getPollId() +
                ", choiceText='" + choiceText + '\'' +
                ", votes=" + votes +
                '}';
    }
}
