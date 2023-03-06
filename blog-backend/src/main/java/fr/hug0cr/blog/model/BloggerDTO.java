package fr.hug0cr.blog.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BloggerDTO {

    private Long id;

    @NotNull
    @Size(max = 20)
    private String username;

}
