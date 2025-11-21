package blog.anime.blog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blog.anime.blog.dto.NoticiaDTO;
import blog.anime.blog.model.Noticia;
import blog.anime.blog.service.NoticiaService;

@RestController
@RequestMapping("/noticias")
public class NoticiaController {

    @Autowired
    private NoticiaService noticiaService;

    @PostMapping
    public ResponseEntity<?> criarNoticia(@RequestBody NoticiaDTO dto) {
        Noticia noticia = noticiaService.salvarNoticia(dto.toEntity());
        return ResponseEntity.ok(noticia);
    }

    @GetMapping
    public List<Noticia> listarNoticias() {
        return noticiaService.listarTodas();
    }
}
