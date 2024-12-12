package ru.ciuis.vblog.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import ru.ciuis.vblog.dto.CreatePostDTO;
import ru.ciuis.vblog.exception.PostDoesNotExistException;
import ru.ciuis.vblog.exception.UnableToCreatePostException;
import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.Image;
import ru.ciuis.vblog.model.Post;
import ru.ciuis.vblog.repository.PostRepository;

import java.util.*;

@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final ImageService imageService;

    @Autowired
    public PostService(PostRepository postRepository, ImageService imageService) {
        this.postRepository = postRepository;
        this.imageService = imageService;
    }

    public Post createPost(CreatePostDTO dto) {
        Post p = new Post();
        p.setContent(dto.getContent());
        if (dto.getScheduled()) {
            p.setPostedDate(dto.getScheduledDate());
        } else {
            p.setPostedDate(new Date());
        }
        p.setAuthor(dto.getAuthor());
        p.setReplies(dto.getReplies());
        p.setScheduled(dto.getScheduled());
        p.setScheduledDate(dto.getScheduledDate());
        p.setAudience(dto.getAudience());
        p.setReplyRestriction(dto.getReplyRestriction());

        try {
            return postRepository.save(p);
        } catch (Exception e) {
            throw new UnableToCreatePostException();
        }
    }

    public Post createMediaPost(String post, List<MultipartFile> files) {
        CreatePostDTO dto = new CreatePostDTO();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            dto = objectMapper.readValue(post, CreatePostDTO.class);

            Post p = new Post();
            p.setContent(dto.getContent());
            if (dto.getScheduled()) {
                p.setPostedDate(dto.getScheduledDate());
            } else {
                p.setPostedDate(new Date());
            }
            p.setAuthor(dto.getAuthor());
            p.setReplies(dto.getReplies());
            p.setScheduled(dto.getScheduled());
            p.setScheduledDate(dto.getScheduledDate());
            p.setAudience(dto.getAudience());
            p.setReplyRestriction(dto.getReplyRestriction());

            //Upload the images
            List<Image> postImages = new ArrayList<>();

            for (MultipartFile file : files) {
                Image postImage = imageService.uploadImage(file, "post");
                postImages.add(postImage);
            }
            p.setImages(postImages);

            return postRepository.save(p);

        } catch (Exception e) {
            throw new UnableToCreatePostException();
        }
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElseThrow(PostDoesNotExistException::new);
    }

    public Set<Post> getAllPostsByAuthor(AppUser author) {

        return postRepository.findByAuthor(author).orElse(new HashSet<>());
    }

    public void deletePost(Post p) {
        postRepository.delete(p);
    }
}
