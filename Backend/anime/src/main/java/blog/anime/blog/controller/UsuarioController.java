package blog.anime.blog.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import blog.anime.blog.entity.User;
import blog.anime.blog.repository.UserRepository;

@RestController
public class UsuarioController {
    private final UserRepository userRepo;

    public UsuarioController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/usuario")
    public User getUsuario(@AuthenticationPrincipal UserDetails userDetails) {
        return userRepo.findByUsername(userDetails.getUsername())
                       .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}
