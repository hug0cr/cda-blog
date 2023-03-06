package fr.hug0cr.blog.service;

import fr.hug0cr.blog.domain.Blogger;
import fr.hug0cr.blog.domain.Comment;
import fr.hug0cr.blog.model.CommentDTO;
import fr.hug0cr.blog.repos.BloggerRepository;
import fr.hug0cr.blog.repos.CommentRepository;
import fr.hug0cr.blog.util.NotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final BloggerRepository bloggerRepository;

    public CommentService(final CommentRepository commentRepository,
            final BloggerRepository bloggerRepository) {
        this.commentRepository = commentRepository;
        this.bloggerRepository = bloggerRepository;
    }

    public List<CommentDTO> findAll() {
        final List<Comment> comments = commentRepository.findAll(Sort.by("id"));
        return comments.stream()
                .map((comment) -> mapToDTO(comment, new CommentDTO()))
                .collect(Collectors.toList());
    }

    public CommentDTO get(final Long id) {
        return commentRepository.findById(id)
                .map(comment -> mapToDTO(comment, new CommentDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final CommentDTO commentDTO) {
        final Comment comment = new Comment();
        mapToEntity(commentDTO, comment);
        return commentRepository.save(comment).getId();
    }

    public void update(final Long id, final CommentDTO commentDTO) {
        final Comment comment = commentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(commentDTO, comment);
        commentRepository.save(comment);
    }

    public void delete(final Long id) {
        commentRepository.deleteById(id);
    }

    private CommentDTO mapToDTO(final Comment comment, final CommentDTO commentDTO) {
        commentDTO.setId(comment.getId());
        commentDTO.setTitle(comment.getTitle());
        commentDTO.setContent(comment.getContent());
        commentDTO.setBlogger(comment.getBlogger() == null ? null : comment.getBlogger().getId());
        return commentDTO;
    }

    private Comment mapToEntity(final CommentDTO commentDTO, final Comment comment) {
        comment.setTitle(commentDTO.getTitle());
        comment.setContent(commentDTO.getContent());
        final Blogger blogger = commentDTO.getBlogger() == null ? null : bloggerRepository.findById(commentDTO.getBlogger())
                .orElseThrow(() -> new NotFoundException("blogger not found"));
        comment.setBlogger(blogger);
        return comment;
    }

}
