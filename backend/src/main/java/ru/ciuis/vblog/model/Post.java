package ru.ciuis.vblog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.BatchSize;

import java.util.*;

@Entity
@Table(name = "posts")
@BatchSize(size = 10)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "post_id")
    private Long postId;

    @Column(length = 256, nullable = false)
    private String content;

    @Column(name = "posted_date")
    private Date postedDate;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private AppUser author;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_likes_junc",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<AppUser> likes;

    @OneToMany
    private List<Image> images;

    //TODO: Add video upload

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_reply_junc",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "reply_id")}
    )
    @JsonIgnore
    private Set<Post> replies;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_repost_junc",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<AppUser> reposts;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_bookmark_junc",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<AppUser> bookmarks;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_view_junc",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<AppUser> views;

    private Boolean scheduled;

    @Column(name = "scheduled_date", nullable = true)
    private Date scheduledDate;

    @Enumerated(EnumType.ORDINAL)
    private Audience audience;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "reply_restriction")
    private ReplyRestriction replyRestriction;

    public Post() {
        this.likes = new HashSet<>();
        this.images = new ArrayList<>();
        this.replies = new HashSet<>();
        this.reposts = new HashSet<>();
        this.bookmarks = new HashSet<>();
        this.views = new HashSet<>();
    }

    public Post(Long postId,
                String content,
                Date postedDate,
                AppUser author,
                Set<AppUser> likes,
                List<Image> images,
                Set<Post> replies,
                Set<AppUser> reposts,
                Set<AppUser> bookmarks,
                Set<AppUser> views,
                Boolean scheduled,
                Date scheduledDate,
                Audience audience,
                ReplyRestriction replyRestriction) {
        this.postId = postId;
        this.content = content;
        this.postedDate = postedDate;
        this.author = author;
        this.likes = likes;
        this.images = images;
        this.replies = replies;
        this.reposts = reposts;
        this.bookmarks = bookmarks;
        this.views = views;
        this.scheduled = scheduled;
        this.scheduledDate = scheduledDate;
        this.audience = audience;
        this.replyRestriction = replyRestriction;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(Date postedDate) {
        this.postedDate = postedDate;
    }

    public AppUser getAuthor() {
        return author;
    }

    public void setAuthor(AppUser author) {
        this.author = author;
    }

    public Set<AppUser> getLikes() {
        return likes;
    }

    public void setLikes(Set<AppUser> likes) {
        this.likes = likes;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public Set<Post> getReplies() {
        return replies;
    }

    public void setReplies(Set<Post> replies) {
        this.replies = replies;
    }

    public Set<AppUser> getReposts() {
        return reposts;
    }

    public void setReposts(Set<AppUser> reposts) {
        this.reposts = reposts;
    }

    public Set<AppUser> getBookmarks() {
        return bookmarks;
    }

    public void setBookmarks(Set<AppUser> bookmarks) {
        this.bookmarks = bookmarks;
    }

    public Set<AppUser> getViews() {
        return views;
    }

    public void setViews(Set<AppUser> views) {
        this.views = views;
    }

    public Boolean getScheduled() {
        return scheduled;
    }

    public void setScheduled(Boolean scheduled) {
        this.scheduled = scheduled;
    }

    public Date getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(Date scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public Audience getAudience() {
        return audience;
    }

    public void setAudience(Audience audience) {
        this.audience = audience;
    }

    public ReplyRestriction getReplyRestriction() {
        return replyRestriction;
    }

    public void setReplyRestriction(ReplyRestriction replyRestriction) {
        this.replyRestriction = replyRestriction;
    }

    @Override
    public String toString() {
        return "Post{" +
                "postId=" + postId +
                ", content='" + content + '\'' +
                ", postedDate=" + postedDate +
                ", author=" + author +
                ", likes=" + likes +
                ", images=" + images +
                ", replies=" + replies +
                ", reposts=" + reposts +
                ", bookmarks=" + bookmarks +
                ", views=" + views +
                ", scheduled=" + scheduled +
                ", scheduledDate=" + scheduledDate +
                ", audience=" + audience +
                ", replyRestriction=" + replyRestriction +
                '}';
    }
}
