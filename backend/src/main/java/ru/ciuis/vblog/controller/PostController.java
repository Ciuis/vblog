package ru.ciuis.vblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import ru.ciuis.vblog.dto.CreatePostDTO;
import ru.ciuis.vblog.exception.PostDoesNotExistException;
import ru.ciuis.vblog.exception.UnableToCreatePostException;
import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.Post;
import ru.ciuis.vblog.service.PostService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @ExceptionHandler({UnableToCreatePostException.class})
    public ResponseEntity<String> handleUnableToCreatePost() {
        return new ResponseEntity<String>("Unable to create post at this time", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/")
    public Post createPost(@RequestBody CreatePostDTO postDTO) {
        return postService.createPost(postDTO);
    }

    @PostMapping(value = "/media", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public Post createMediaPost(@RequestPart("post") String post, @RequestPart("media") List<MultipartFile> files) {
        return postService.createMediaPost(post, files);
    }

    @ExceptionHandler({PostDoesNotExistException.class})
    public ResponseEntity<String> handlePostDoesNotExist() {
        return new ResponseEntity<String>("The requested post does not exist", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/id/{id}")
    public Post getPostById(@PathVariable("id") Long id) {
        return postService.getPostById(id);
    }

    @GetMapping("/author/{id}")
    public Set<Post> getPostByAuthor(@PathVariable("id") Long userId) {
        AppUser author = new AppUser();
        author.setId(userId);

        return postService.getAllPostsByAuthor(author);
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deletePost(@RequestBody Post p) {
        postService.deletePost(p);

        return new ResponseEntity<String>("Post has been deleted", HttpStatus.OK);
    }
}
