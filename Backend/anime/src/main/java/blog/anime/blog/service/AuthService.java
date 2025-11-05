package blog.anime.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import blog.anime.blog.dto.AuthRequest;
import blog.anime.blog.dto.AuthResponse;
import blog.anime.blog.security.JwtUtil;

@Service
public class AuthService {
    @Autowired private AuthenticationManager authManager;
    @Autowired private JwtUtil jwtUtil;

    public AuthResponse authenticate(AuthRequest request) {
        @SuppressWarnings("unused")
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        String token = jwtUtil.generateToken(request.getUsername());
        return new AuthResponse(token);
    }
}
