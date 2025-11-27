package blog.anime.blog.service;

import java.util.List;
import java.util.Objects;
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

    // ✅ Atualizar notícia

    public Noticia atualizarNoticia(Long id, Noticia noticiaAtualizada) {
        Objects.requireNonNull(id, "O ID da notícia não pode ser nulo.");
        return noticiaRepository.findById(id).map(noticia -> {
            noticia.setTitulo(noticiaAtualizada.getTitulo());
            noticia.setTexto(noticiaAtualizada.getTexto());
            noticia.setImagemUrl(noticiaAtualizada.getImagemUrl());
            noticia.setCategoria(noticiaAtualizada.getCategoria());
            noticia.setSubcategoria(noticiaAtualizada.getSubcategoria());
            noticia.setDataPublicacao(noticiaAtualizada.getDataPublicacao());
            noticia.setAutor(noticiaAtualizada.getAutor());
            return noticiaRepository.save(noticia);
        }).orElse(null);
    }

    public boolean removerNoticia(Long id) {
        Objects.requireNonNull(id, "O ID da notícia não pode ser nulo.");
        if (noticiaRepository.existsById(id)) {
            noticiaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
