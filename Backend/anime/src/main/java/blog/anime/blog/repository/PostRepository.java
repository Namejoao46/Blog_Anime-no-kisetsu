package blog.anime.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import blog.anime.blog.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {}
