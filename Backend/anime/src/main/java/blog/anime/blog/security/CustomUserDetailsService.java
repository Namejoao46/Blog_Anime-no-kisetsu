package blog.anime.blog.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import blog.anime.blog.entity.User;
import blog.anime.blog.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired 
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername (String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return new org.springframework.security.core.userdetails.User(
            user.getUsername(), user.getPassword(), new ArrayList<>()
        );
    }
}
