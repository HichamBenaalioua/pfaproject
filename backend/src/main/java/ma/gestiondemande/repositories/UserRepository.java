package ma.gestiondemande.repositories;

import ma.gestiondemande.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {

    List<User> findAll();
    User findById(int id);

    User findByNom(String username);

}

