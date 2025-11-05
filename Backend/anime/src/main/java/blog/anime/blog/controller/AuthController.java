package blog.anime.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blog.anime.blog.dto.AuthRequest;
import blog.anime.blog.dto.AuthResponse;
import blog.anime.blog.dto.RegisterRequest;
import blog.anime.blog.service.AuthService;
import blog.anime.blog.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired private UserService userService;
    @Autowired private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        userService.register(request);
        return ResponseEntity.ok("Usuário registrado com sucesso");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
