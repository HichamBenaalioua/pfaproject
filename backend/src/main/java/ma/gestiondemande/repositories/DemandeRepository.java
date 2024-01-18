package ma.gestiondemande.repositories;

import ma.gestiondemande.entities.Demande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DemandeRepository extends JpaRepository<Demande,Integer> {

    List<Demande> findAll();
    Demande findById(int id);
}
