package fr.hug0cr.blog.rest;

import fr.hug0cr.blog.model.PostDTO;
import fr.hug0cr.blog.service.PostService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(value = "/api/posts", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
@Slf4j
public class PostResource {

    private final PostService postService;

    public PostResource(final PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        return ResponseEntity.ok(postService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPost(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(postService.get(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<PostDTO>> searchPosts(@RequestParam final String searchTerm) {
        return ResponseEntity.ok(postService.findPostContaining(searchTerm));
    }

    @GetMapping("/user/{bloggerId}")
    public ResponseEntity<List<PostDTO>> getPostsByBloggerId(@PathVariable(name = "bloggerId") final UUID bloggerId) {
        return ResponseEntity.ok(postService.findByBloggerId(bloggerId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    @Secured("ROLE_USER")
    public ResponseEntity<Long> createPost(@RequestBody @Valid final PostDTO postDTO,
                                           Authentication authentication) {
        return new ResponseEntity<>(postService.create(postDTO, UUID.fromString(authentication.getName())), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_USER")
    public ResponseEntity<Void> updatePost(@PathVariable(name = "id") final Long id,
                                           @RequestBody @Valid final PostDTO postDTO,
                                           Authentication authentication) {
        postService.update(id, postDTO, UUID.fromString(authentication.getName()));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    @Secured("ROLE_USER")
    public ResponseEntity<Void> deletePost(@PathVariable(name = "id") final Long id,
                                           Authentication authentication) {
        postService.delete(id, UUID.fromString(authentication.getName()));
        return ResponseEntity.noContent().build();
    }



}
