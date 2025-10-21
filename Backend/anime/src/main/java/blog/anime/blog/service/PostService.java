package blog.anime.blog.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.anime.blog.model.Post;
import blog.anime.blog.repository.PostRepository;

@Service
public class PostService {

        @Autowired
        private PostRepository repo;

        public List<Post> listar() {
            return repo.findAll();
        }

        public Post salvar(Post post) {
            return repo.save(post);
        }
}
