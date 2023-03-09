package fr.hug0cr.blog.service;

import fr.hug0cr.blog.domain.Blogger;
import fr.hug0cr.blog.domain.Comment;
import fr.hug0cr.blog.domain.Post;
import fr.hug0cr.blog.model.PostDTO;
import fr.hug0cr.blog.repos.BloggerRepository;
import fr.hug0cr.blog.repos.CommentRepository;
import fr.hug0cr.blog.repos.PostRepository;
import fr.hug0cr.blog.util.NotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.domain.Sort.Direction.DESC;


@Transactional
@Service
public class PostService {

    private final PostRepository postRepository;
    private final BloggerRepository bloggerRepository;
    private final CommentRepository commentRepository;

    public PostService(final PostRepository postRepository,
            final BloggerRepository bloggerRepository, final CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.bloggerRepository = bloggerRepository;
        this.commentRepository = commentRepository;
    }

    public List<PostDTO> findAll() {
        final List<Post> posts = postRepository.findAll(Sort.by(DESC, "lastUpdated"));
        return posts.stream()
                .map((post) -> mapToDTO(post, new PostDTO()))
                .collect(Collectors.toList());
    }

    public PostDTO get(final Long id) {
        return postRepository.findById(id)
                .map(post -> mapToDTO(post, new PostDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final PostDTO postDTO, String username) {
        Blogger blogger = bloggerRepository.findBloggerByUsername(username)
                .orElseThrow(() -> new NotFoundException("blogger not found"));
        postDTO.setBlogger(blogger.getId());
        final Post post = new Post();
        mapToEntity(postDTO, post);
        return postRepository.save(post).getId();
    }

    public void update(final Long id, final PostDTO postDTO) {
        final Post post = postRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(postDTO, post);
        postRepository.save(post);
    }

    public void delete(final Long id) {
        postRepository.deleteById(id);
    }

    private PostDTO mapToDTO(final Post post, final PostDTO postDTO) {
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setPublished(post.getPublished());
        postDTO.setBlogger(post.getBlogger() == null ? null : post.getBlogger().getId());
        postDTO.setComments(post.getComments() == null ? null : post.getComments().stream()
                .map(Comment::getId)
                .collect(Collectors.toList()));
        return postDTO;
    }

    private Post mapToEntity(final PostDTO postDTO, final Post post) {
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setPublished(postDTO.getPublished());
        final Blogger blogger = postDTO.getBlogger() == null ? null : bloggerRepository.findById(postDTO.getBlogger())
                .orElseThrow(() -> new NotFoundException("blogger not found"));
        post.setBlogger(blogger);
        final List<Comment> comments = commentRepository.findAllById(
                postDTO.getComments() == null ? Collections.emptyList() : postDTO.getComments());
        if (comments.size() != (postDTO.getComments() == null ? 0 : postDTO.getComments().size())) {
            throw new NotFoundException("one of comments not found");
        }
        post.setComments(comments.stream().collect(Collectors.toSet()));
        return post;
    }

}
