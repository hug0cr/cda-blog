package fr.hug0cr.blog;

import fr.hug0cr.blog.model.BloggerDTO;
import fr.hug0cr.blog.model.PostDTO;
import fr.hug0cr.blog.service.BloggerService;
import fr.hug0cr.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FakeDataInit implements CommandLineRunner {
    private final BloggerService bloggerService;
    private final PostService postService;
    
    @Override
    public void run(String... args) {
        BloggerDTO bloggerDTO = new BloggerDTO();
        bloggerDTO.setUsername("CommandLineBlogger");
        Long bloggerId = bloggerService.create(bloggerDTO);

        PostDTO postDTO1 = getPostDTO("CommandLineTitle", bloggerId);
        postService.create(postDTO1);
        PostDTO postDTO2 = getPostDTO("Second CommandLineTitle", bloggerId);
        postService.create(postDTO2);
        PostDTO postDTO3 = getPostDTO("Third CommandLineTitle", bloggerId);
        postService.create(postDTO3);
    }

    private static PostDTO getPostDTO(String title, Long bloggerId) {
        PostDTO postDTO = new PostDTO();
        postDTO.setTitle(title);
        postDTO.setContent("""
                Depuis le Command Line Runner,
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend risus nec risus pharetra,
                volutpat dictum risus scelerisque. Suspendisse eu ultricies ligula. Quisque maximus nec enim at
                volutpat. Aliquam mattis rutrum iaculis. Donec semper leo ac augue rutrum molestie. Etiam fringilla
                aliquet dolor eget imperdiet. Donec elementum sodales lectus id pharetra. Fusce euismod eros neque,
                in vestibulum nisl porttitor eu. Sed nec urna eget dui commodo sodales. Nulla facilisi. Etiam non
                elementum dolor. Ut lorem ligula, ultricies at dapibus eget, commodo feugiat lacus. Curabitur eleifend
                tristique elit cursus lobortis. Pellentesque tincidunt vestibulum dapibus. Morbi sed sem eu nisl congue
                suscipit.
                                
                Aenean malesuada orci sit amet quam scelerisque, ac cursus massa viverra. Proin risus orci,
                lacinia non erat sit amet, iaculis mattis lorem. Quisque ultricies, massa sit amet commodo commodo,
                ex est sagittis nisi, a pulvinar velit eros placerat nisl. Donec id facilisis mi. Vivamus volutpat
                ipsum tortor, in ullamcorper metus faucibus non. Phasellus nec urna auctor, dictum arcu sed,
                condimentum nisi. Nulla facilisi. Integer quis libero ut ex porttitor aliquam. Suspendisse dictum ante
                in magna faucibus, euismod mattis ante eleifend.
                """);
        postDTO.setPublished(true);
        postDTO.setBlogger(bloggerId);
        return postDTO;
    }
}
