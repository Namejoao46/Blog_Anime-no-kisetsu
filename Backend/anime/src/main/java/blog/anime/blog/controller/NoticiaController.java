package blog.anime.blog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blog.anime.blog.dto.NoticiaDTO;
import blog.anime.blog.model.Noticia;
import blog.anime.blog.service.NoticiaService;

@RestController
@RequestMapping("/noticias")
@CrossOrigin(origins = "http://localhost:4200")
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

    @GetMapping("/{id}")
    public ResponseEntity<Noticia> buscarPorId(@PathVariable Long id) {
        Noticia noticia = noticiaService.buscarPorId(id);
        if (noticia != null) {
            return ResponseEntity.ok(noticia);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Atualizar notícia
    @PutMapping("/{id}")
    public ResponseEntity<Noticia> atualizarNoticia(@PathVariable Long id,
                                                    @RequestBody Noticia noticia) {
        Noticia noticiaAtualizada = noticiaService.atualizarNoticia(id, noticia);
        if (noticiaAtualizada != null) {
            return ResponseEntity.ok(noticiaAtualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Remover notícia
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerNoticia(@PathVariable Long id) {
        boolean removida = noticiaService.removerNoticia(id);
        if (removida) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

