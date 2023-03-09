package fr.hug0cr.blog.security;

import fr.hug0cr.blog.model.BloggerDTO;
import fr.hug0cr.blog.service.BloggerService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtUserFilter extends OncePerRequestFilter {

    private final BloggerService bloggerService;
    private final JwtDecoder jwtDecoder;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);

            try {
                Jwt jwtToken = jwtDecoder.decode(jwt);
                String username = jwtToken.getClaim("preferred_username");

                if (username != null && !bloggerService.usernameExists(username)) {
                    // Persist user if does not exist
                    BloggerDTO blogger = new BloggerDTO();
                    blogger.setUsername(username);
                    bloggerService.create(blogger);
                }
            } catch (JwtException e) {
                log.error(e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
