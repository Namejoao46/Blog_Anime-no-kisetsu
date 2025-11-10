package blog.anime.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.anime.blog.model.Noticia;
import blog.anime.blog.repository.NoticiaRepository;

@Service
public class NoticiaService {

    @Autowired
    private NoticiaRepository noticiaRepository;

    @Autowired
    private ClassificacaoService classificacaoService;

    public Noticia salvarNoticia(Noticia noticia){
        String categoria = classificacaoService.detectarCategoria(noticia.getTexto());
        String subcategoria = classificacaoService.detectarSubcategoria(noticia.getTexto(), categoria);
        noticia.setCategoria(categoria);
        noticia.setSubcategoria(subcategoria);
        return noticiaRepository.save(noticia);
    }
}
