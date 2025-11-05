package blog.anime.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import blog.anime.blog.dto.RegisterRequest;
import blog.anime.blog.entity.User;
import blog.anime.blog.repository.UserRepository;

@Service
public class UserService {
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder encoder;

    public void register(RegisterRequest request){
        if (userRepo.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Usuário já existe");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));
        userRepo.save(user);
    }
}
