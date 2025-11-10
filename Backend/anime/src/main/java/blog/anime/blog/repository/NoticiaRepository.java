package blog.anime.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import blog.anime.blog.model.Noticia;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Long> {
  // Aqui você pode adicionar métodos personalizados, se quiser
}
