package fr.hug0cr.blog.repos;

import fr.hug0cr.blog.domain.Blogger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;


public interface BloggerRepository extends JpaRepository<Blogger, UUID> {

    boolean existsByUsernameIgnoreCase(String username);
}
