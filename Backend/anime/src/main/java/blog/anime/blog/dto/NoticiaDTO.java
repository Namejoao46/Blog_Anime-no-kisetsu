package blog.anime.blog.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import blog.anime.blog.model.Noticia;

public class NoticiaDTO {
    @NotBlank(message = "O título é obrigatório")
    private String titulo;

    @NotBlank(message = "O texto é obrigatório")
    private String texto;

    private String imagemUrl;

    private String categoria;
    private String subcategoria;

    @NotNull(message = "A data de publicação é obrigatória")
    private LocalDate dataPublicacao;
    private String autor;

    public Noticia toEntity() {
        Noticia noticia = new Noticia();
        noticia.setTitulo(this.titulo);
        noticia.setTexto(this.texto);
        noticia.setImagemUrl(this.imagemUrl);
        noticia.setCategoria(this.categoria);
        noticia.setSubcategoria(this.subcategoria);
        noticia.setDataPublicacao(this.dataPublicacao);
        noticia.setAutor(this.autor);
        return noticia;
    }

    // Getters e Setters
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getSubcategoria() { return subcategoria; }
    public void setSubcategoria(String subcategoria) { this.subcategoria = subcategoria; }

    public LocalDate getDataPublicacao() { return dataPublicacao; }
    public void setDataPublicacao(LocalDate dataPublicacao) { this.dataPublicacao = dataPublicacao; }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }
}
