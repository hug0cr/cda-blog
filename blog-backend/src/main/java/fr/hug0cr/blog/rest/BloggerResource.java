package fr.hug0cr.blog.rest;

import fr.hug0cr.blog.model.BloggerDTO;
import fr.hug0cr.blog.service.BloggerService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/bloggers", produces = MediaType.APPLICATION_JSON_VALUE)
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
    public ResponseEntity<BloggerDTO> getBlogger(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(bloggerService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createBlogger(@RequestBody @Valid final BloggerDTO bloggerDTO) {
        return new ResponseEntity<>(bloggerService.create(bloggerDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateBlogger(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final BloggerDTO bloggerDTO) {
        bloggerService.update(id, bloggerDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteBlogger(@PathVariable(name = "id") final Long id) {
        bloggerService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
