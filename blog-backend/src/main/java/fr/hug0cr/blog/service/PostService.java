package fr.hug0cr.blog.service;

import fr.hug0cr.blog.domain.Blogger;
import fr.hug0cr.blog.domain.Comment;
import fr.hug0cr.blog.domain.Post;
import fr.hug0cr.blog.model.PostDTO;
import fr.hug0cr.blog.repos.BloggerRepository;
import fr.hug0cr.blog.repos.CommentRepository;
import fr.hug0cr.blog.repos.PostRepository;
import fr.hug0cr.blog.util.NotFoundException;
import fr.hug0cr.blog.util.UnauthorizedException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

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
                .map(post -> mapToDTO(post, new PostDTO()))
                .toList();
    }

    public PostDTO get(final Long id) {
        return postRepository.findById(id)
                .map(post -> mapToDTO(post, new PostDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final PostDTO postDTO, UUID authenticationUUID) {
        checkIfUserIsOwner(postDTO, authenticationUUID);
        final Post post = new Post();
        mapToEntity(postDTO, post);
        return postRepository.save(post).getId();
    }

    public void update(final Long id, final PostDTO postDTO, UUID authenticationUUID) {
        checkIfUserIsOwner(postDTO, authenticationUUID);
        final Post post = postRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(postDTO, post);
        postRepository.save(post);
    }

    public void delete(final Long id, UUID authenticationUUID) {
        PostDTO postDTO = get(id);
        checkIfUserIsOwner(postDTO, authenticationUUID);
        postRepository.deleteById(id);
    }

    private void checkIfUserIsOwner(PostDTO postDTO, UUID authenticationUUID) {
        UUID postBlogger = postDTO.getBlogger();
        if (!postBlogger.equals(authenticationUUID)) throw new UnauthorizedException();
    }

    private PostDTO mapToDTO(final Post post, final PostDTO postDTO) {
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setPublished(post.getPublished());
        postDTO.setBlogger(post.getBlogger() == null ? null : post.getBlogger().getId());
        postDTO.setComments(post.getComments() == null ? null : post.getComments().stream()
                .map(Comment::getId)
                .toList());
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
        post.setComments(new HashSet<>(comments));
        return post;
    }

}
