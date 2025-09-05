import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDto } from 'src/app/interfaces/pokemon-dto';
import { PokemonService } from 'src/app/servicios/pokemon.service';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss']
})
export class PokemonViewComponent {

  pokemon: PokemonDto = {} as PokemonDto;
  public searchValue: string = ''

constructor(
  private route: ActivatedRoute,
  public pokemonservice: PokemonService) {}
  
  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.searchValue = params['search'];
    console.log('Valor de search:', this.searchValue);
    // Aquí puedes usar searchValue para hacer una búsqueda o cargar datos
  });
  this.pokemonDetails()
  }    
  pokemonDetails(){
    this.pokemonservice.getPokemonDetails(this.searchValue).subscribe(data => this.pokemon = data)
  }
}