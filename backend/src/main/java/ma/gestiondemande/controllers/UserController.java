package ma.gestiondemande.controllers;

import ma.gestiondemande.entities.User;
import ma.gestiondemande.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:8081/")
public class UserController {


    @Autowired
    private UserRepository userRepository;


    @GetMapping("/all")
    private List<User> findAll(){
        return  userRepository.findAll();
    }

    @PostMapping("/save")
    private void save(@RequestBody User user){
        userRepository.save(user);
    }

    @GetMapping("/{id}")
    private User findById(@PathVariable int id){
        return userRepository.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    private void delete(@PathVariable int id){
        User user = userRepository.findById(id);
        userRepository.delete(user);
    }

    @GetMapping("/id/{name}")
    public int getUserIdByName(@PathVariable String name) {
        return userRepository.findByNom(name).getId();
    }

    @PostMapping("/checkLogin")
    private boolean checkLogin(@RequestBody User loginCredentials) {
        String username = loginCredentials.getNom();
        String password = loginCredentials.getPassword();

        User user = userRepository.findByNom(username);

        if (user != null && user.getPassword().equals(password)) {
            return true;
        } else {
            return false;
        }
    }
}