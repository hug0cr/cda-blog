package fr.hug0cr.blog.rest;

import fr.hug0cr.blog.model.BloggerDTO;
import fr.hug0cr.blog.service.BloggerService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/bloggers", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class BloggerResource {

    private final BloggerService bloggerService;

    public BloggerResource(final BloggerService bloggerService) {
        this.bloggerService = bloggerService;
    }

    @GetMapping
    public ResponseEntity<List<BloggerDTO>> getAllBloggers() {
        return ResponseEntity.ok(bloggerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloggerDTO> getBlogger(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(bloggerService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createBlogger(@RequestBody @Valid final BloggerDTO bloggerDTO) {
        return new ResponseEntity<>(bloggerService.create(bloggerDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateBlogger(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final BloggerDTO bloggerDTO) {
        bloggerService.update(id, bloggerDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteBlogger(@PathVariable(name = "id") final UUID id) {
        bloggerService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
