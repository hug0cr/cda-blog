package fr.hug0cr.blog.repos;

import fr.hug0cr.blog.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;


public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByBloggerId(UUID uuid);

    @Query(value = """
                    select p from Post p 
                    where p.title ilike %:searchTerm%
                    or p.content ilike %:searchTerm%
                    or p.blogger.username ilike %:searchTerm%
            """)
    List<Post> findBySearchTerm(String searchTerm);
}
