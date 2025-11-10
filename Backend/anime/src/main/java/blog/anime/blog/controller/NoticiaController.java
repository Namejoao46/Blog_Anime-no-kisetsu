package blog.anime.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import blog.anime.blog.dto.NoticiaDTO;
import blog.anime.blog.model.Noticia;
import blog.anime.blog.service.NoticiaService;

public class NoticiaController {

    @Autowired
    private NoticiaService noticiaService;

    @PostMapping("/noticias")
        public ResponseEntity<?> criarNoticia(@RequestBody NoticiaDTO dto) {
            Noticia noticia = noticiaService.salvarNoticia(dto.toEntity());
            return ResponseEntity.ok(noticia);
        }
}
