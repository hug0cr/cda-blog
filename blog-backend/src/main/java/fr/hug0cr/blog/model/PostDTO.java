package fr.hug0cr.blog.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PostDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String title;

    @NotNull
    private String content;

    @NotNull
    private Boolean published;

//    @NotNull
    private Long blogger;

    private List<Long> comments;

}
