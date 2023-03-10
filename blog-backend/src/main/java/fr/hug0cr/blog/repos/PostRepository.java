package fr.hug0cr.blog.repos;

import fr.hug0cr.blog.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByBloggerId(UUID uuid);
}
