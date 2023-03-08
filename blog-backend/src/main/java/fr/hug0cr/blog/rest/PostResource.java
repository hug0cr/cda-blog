package fr.hug0cr.blog.rest;

import fr.hug0cr.blog.model.PostDTO;
import fr.hug0cr.blog.service.PostService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/posts", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
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

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createPost(@RequestBody @Valid final PostDTO postDTO) {
        return new ResponseEntity<>(postService.create(postDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePost(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final PostDTO postDTO) {
        postService.update(id, postDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deletePost(@PathVariable(name = "id") final Long id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
