package fr.hug0cr.blog.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
public class BloggerDTO {

    @NotNull
    private UUID id;

    @NotNull
    @Size(max = 20)
    private String username;

}
