package blog.anime.blog.dto;

import blog.anime.blog.model.Noticia;

public class NoticiaDTO {
    private String titulo;
    private String texto;

    public Noticia toEntity() {
        Noticia noticia = new Noticia();
        noticia.setTitulo(this.titulo);
        noticia.setTexto(this.texto);
        return noticia;
    }
}
