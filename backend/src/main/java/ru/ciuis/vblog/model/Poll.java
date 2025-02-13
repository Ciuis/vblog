package ru.ciuis.vblog.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "polls")
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "poll_id")
    private Long pollId;

    @Column(name="end_date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime;

    @OneToMany(mappedBy = "poll")
    private List<PollChoice> pollChoiceList;

    public Poll() {
    }

    public Poll(Long pollId, LocalDateTime endTime, List<PollChoice> pollChoiceList) {
        this.pollId = pollId;
        this.endTime = endTime;
        this.pollChoiceList = pollChoiceList;
    }

    public Long getPollId() {
        return pollId;
    }

    public void setPollId(Long pollId) {
        this.pollId = pollId;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public List<PollChoice> getPollChoiceList() {
        return pollChoiceList;
    }

    public void setPollChoiceList(List<PollChoice> pollChoiceList) {
        this.pollChoiceList = pollChoiceList;
    }

    @Override
    public String toString() {
        return "Poll{" +
                "pollId=" + pollId +
                ", endTime=" + endTime +
                ", pollChoiceList=" + pollChoiceList +
                '}';
    }
}
