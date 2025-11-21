package blog.anime.blog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blog.anime.blog.model.Post;
import blog.anime.blog.service.PostService;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService service;

    @GetMapping
    public @NonNull List<Post> listar() {
        return service.listar();
    }

    @PostMapping
    public @NonNull Post salvar(@RequestBody @NonNull Post post) {
        return service.salvar(post);
    }
}
