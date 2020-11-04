package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Horario;
import br.com.myreserve.repositories.HorarioRepository;

@RestController
@RequestMapping("/Horario")
public class HorarioController {
	
	@Autowired
	private HorarioRepository horarioRepository;
	
	@GetMapping
	public Iterable<Horario> getHorarios(){
		return horarioRepository.findAll();
	}
	
	@GetMapping("/{id_horario}")
	public Optional<Horario> getHorario(@PathVariable int id_horario){
		return horarioRepository.findById(id_horario);
	}
	
	@PostMapping()
	public void addHorario(@RequestBody Horario horario) {
		horarioRepository.save(horario);
	}
	
	@PutMapping("/{id_horario}")
	public Horario updateHorario(@RequestBody Horario horario, @PathVariable int id_horario) {
		Horario HorarioDB = horarioRepository.findOneByCodigo(id_horario);
		
		if(horario.getHorario_de() != null) horario.setHorario_de(horario.getHorario_de());
		
		if(horario.getHorario_ate() != null) horario.setHorario_ate(horario.getHorario_ate());
		
		if(horario.getQtd_pessoa_vaga() != null) horario.setQtd_pessoa_vaga(horario.getQtd_pessoa_vaga());
		
		if(horario.getTotal_vagas() != null) horario.setTotal_vagas(horario.getTotal_vagas());
		
		if(horario.getVagas_at_moment() != null) horario.setVagas_at_moment(horario.getVagas_at_moment());
		
		horarioRepository.save(HorarioDB);
		return HorarioDB;
	}
	
	
	/*
	@DeleteMapping("/{id_horario}")
	public void deleteHorario(@PathVariable Integer id_horario) {
		horarioRepository.deleteById(id_horario);
	}
	 */
}