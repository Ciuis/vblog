package ru.ciuis.vblog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.Poll;
import ru.ciuis.vblog.model.PollChoice;
import ru.ciuis.vblog.repository.PollChoiceRepository;
import ru.ciuis.vblog.repository.PollRepository;

import java.util.Set;

@Service
public class PollService {
    private final PollRepository pollRepository;
    private final PollChoiceRepository pollChoiceRepository;

    @Autowired
    public PollService(PollRepository pollRepository, PollChoiceRepository pollChoiceRepository) {
        this.pollRepository = pollRepository;
        this.pollChoiceRepository = pollChoiceRepository;
    }

    //Create all the poll options before they are attached to post
    public PollChoice generatePollChoice(PollChoice pollChoice) {
        return pollChoiceRepository.save(pollChoice);
    }

    //Create a poll before it gets attached to the post
    public Poll generatePoll(Poll poll) {
        return pollRepository.save(poll);
    }

    //Place a vote on poll
    public Poll voteForChoice(PollChoice pollChoice, AppUser user) {
        //Update a choice itself
        Set<AppUser> currentVotes = pollChoice.getVotes();
        currentVotes.add(user);
        pollChoice.setVotes(currentVotes);
        pollChoiceRepository.save(pollChoice);

        return pollRepository.findById(pollChoice.getPoll().getPollId()).get();
    }
}
