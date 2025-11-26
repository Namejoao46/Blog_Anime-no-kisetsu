package blog.anime.blog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.anime.blog.model.Noticia;
import blog.anime.blog.repository.NoticiaRepository;

@Service
public class NoticiaService {

    @Autowired
    private NoticiaRepository noticiaRepository;

    public Noticia salvarNoticia(Noticia noticia) {
        if (noticia.getCategoria() == null || noticia.getCategoria().isBlank()) {
            noticia.setCategoria("Outros");
        }
        if (noticia.getSubcategoria() == null || noticia.getSubcategoria().isBlank()) {
            noticia.setSubcategoria("Geral");
        }
        return noticiaRepository.save(noticia);
    }
    
    public List<Noticia> listarTodas() {
        return noticiaRepository.findAll();
    }
    
    public Noticia buscarPorId(Long id) {
    if (id == null) {
        throw new IllegalArgumentException("O ID da notícia não pode ser nulo.");
    }
        Optional<Noticia> noticiaOpt = noticiaRepository.findById(id);
        return noticiaOpt.orElse(null);
    }
}
