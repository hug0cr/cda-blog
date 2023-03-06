package fr.hug0cr.blog.repos;

import fr.hug0cr.blog.domain.Blogger;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BloggerRepository extends JpaRepository<Blogger, Long> {

    boolean existsByUsernameIgnoreCase(String username);

}
