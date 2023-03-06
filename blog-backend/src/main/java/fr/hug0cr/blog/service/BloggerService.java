package fr.hug0cr.blog.service;

import fr.hug0cr.blog.domain.Blogger;
import fr.hug0cr.blog.model.BloggerDTO;
import fr.hug0cr.blog.repos.BloggerRepository;
import fr.hug0cr.blog.util.NotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class BloggerService {

    private final BloggerRepository bloggerRepository;

    public BloggerService(final BloggerRepository bloggerRepository) {
        this.bloggerRepository = bloggerRepository;
    }

    public List<BloggerDTO> findAll() {
        final List<Blogger> bloggers = bloggerRepository.findAll(Sort.by("id"));
        return bloggers.stream()
                .map((blogger) -> mapToDTO(blogger, new BloggerDTO()))
                .collect(Collectors.toList());
    }

    public BloggerDTO get(final Long id) {
        return bloggerRepository.findById(id)
                .map(blogger -> mapToDTO(blogger, new BloggerDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final BloggerDTO bloggerDTO) {
        final Blogger blogger = new Blogger();
        mapToEntity(bloggerDTO, blogger);
        return bloggerRepository.save(blogger).getId();
    }

    public void update(final Long id, final BloggerDTO bloggerDTO) {
        final Blogger blogger = bloggerRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(bloggerDTO, blogger);
        bloggerRepository.save(blogger);
    }

    public void delete(final Long id) {
        bloggerRepository.deleteById(id);
    }

    private BloggerDTO mapToDTO(final Blogger blogger, final BloggerDTO bloggerDTO) {
        bloggerDTO.setId(blogger.getId());
        bloggerDTO.setUsername(blogger.getUsername());
        return bloggerDTO;
    }

    private Blogger mapToEntity(final BloggerDTO bloggerDTO, final Blogger blogger) {
        blogger.setUsername(bloggerDTO.getUsername());
        return blogger;
    }

    public boolean usernameExists(final String username) {
        return bloggerRepository.existsByUsernameIgnoreCase(username);
    }

}
