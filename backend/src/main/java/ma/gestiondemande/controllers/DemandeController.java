package ma.gestiondemande.controllers;


import ma.gestiondemande.entities.Demande;
import ma.gestiondemande.repositories.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/demandes")
@CrossOrigin("http://localhost:3000/")
public class DemandeController {


    @Autowired
    private DemandeRepository demandeRepository;


    @GetMapping("/all")
    private List<Demande> findAll(){
        return  demandeRepository.findAll();
    }

    @PostMapping("/save")
    private void save(@RequestBody Demande demande){
        demandeRepository.save(demande);
    }

    @GetMapping("/{id}")
    private Demande findById(@PathVariable int id){
        return demandeRepository.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    private void delete(@PathVariable int id){
        Demande demande = demandeRepository.findById(id);
        demandeRepository.delete(demande);
    }
}