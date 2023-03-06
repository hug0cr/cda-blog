package fr.hug0cr.blog.repos;

import fr.hug0cr.blog.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {
}
