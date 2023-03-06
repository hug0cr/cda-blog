package fr.hug0cr.blog.repos;

import fr.hug0cr.blog.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PostRepository extends JpaRepository<Post, Long> {
}
