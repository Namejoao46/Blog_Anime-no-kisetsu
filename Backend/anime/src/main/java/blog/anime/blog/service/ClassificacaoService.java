package blog.anime.blog.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class ClassificacaoService {
    private final Map<String, List<String>> subcategorias = Map.of(
        "Anime", List.of("naruto", "one piece", "jujutsu kaisen"),
        "Manga", List.of("berserk", "chainsaw man", "tokyo revengers"),
        "Games", List.of("elden ring", "fortnite", "gta"),
        "Manhwa", List.of("solo leveling", "tower of god")
    );

    public String detectarCategoria(String texto) {
        if (texto == null || texto.isBlank()){
            return "Outros";
        }
        texto = texto.toLowerCase();
        for(String categoria : subcategorias.keySet()) {
            for (String termo : subcategorias.get(categoria)) {
                if (texto.contains(termo)) return categoria;
            }
        }
        return "Outros";
    }

    public String detectarSubcategoria(String texto, String categoria) {
        if (texto == null || texto.isBlank()){
            return "Geral";
        }
        texto = texto.toLowerCase();
        for (String termo : subcategorias.getOrDefault(categoria, List.of())) {
            if (texto.contains(termo))return termo;
        }
        return "Geral";
    }
}
