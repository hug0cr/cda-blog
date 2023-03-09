package fr.hug0cr.blog.security;

import fr.hug0cr.blog.domain.Blogger;
import fr.hug0cr.blog.repos.BloggerRepository;
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
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtUserFilter extends OncePerRequestFilter {

    private final BloggerRepository bloggerRepository;
    private final JwtDecoder jwtDecoder;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);

            try {
                Jwt jwtToken = jwtDecoder.decode(jwt);
                UUID uuid = UUID.fromString(jwtToken.getSubject());
                String username = jwtToken.getClaim("preferred_username");

                boolean bloggerExist = bloggerRepository.findById(uuid).isPresent();

                if (username != null && !bloggerExist) {
                    // Persist user if does not exist
                    Blogger blogger = new Blogger();
                    blogger.setId(uuid);
                    blogger.setUsername(username);
                    Blogger savedBlogger = bloggerRepository.save(blogger);
                    log.debug("New blogger saved : {}", savedBlogger);
                }
            } catch (JwtException e) {
                log.error(e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
