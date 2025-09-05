import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectService } from 'src/app/servicios/subject.service';
import { LocalService } from '../../servicios/local.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { PokemonListDto } from 'src/app/interfaces/pokemon-list-dto';
import { PokemonService } from 'src/app/servicios/pokemon.service';
import { catchError, debounceTime, switchMap} from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public usersubjets: any = [];
  public pokemons: any = [];
  public displayedColumns: string[] = ['name', 'urlImage']
  pokemon: PokemonListDto[] = [];
  pokemontype: { value: string; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'fire', label: 'Fire' },
  { value: 'water', label: 'Water' },
  { value: 'electric', label: 'Electric' },
  { value: 'grass', label: 'Grass' },
  { value: 'ice', label: 'Ice' },
  { value: 'fighting', label: 'Fighting' },
  { value: 'poison', label: 'Poison' },
  { value: 'ground', label: 'Ground' },
  { value: 'flying', label: 'Flying' },
  { value: 'psychic', label: 'Psychic' },
  { value: 'bug', label: 'Bug' },
  { value: 'rock', label: 'Rock' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'dragon', label: 'Dragon' },
  { value: 'dark', label: 'Dark' },
  { value: 'steel', label: 'Steel' },
  { value: 'fairy', label: 'Fairy' },
  { value: 'stellar', label: 'Stellar' }
  ];
  searchControl = new FormControl('');
  length = 1302;
  paginatedList: any[] = [];
  pageSize = 10;
  pageIndex = 0;
  filteredSuggestions: string[] = [];
  dataSource = new MatTableDataSource<PokemonListDto>(this.pokemon);
  constructor(
    private http: HttpClient,
    public pokemonservice: PokemonService,
    public subjectservice: SubjectService,
    public localstorageservice: LocalService,
    private dialog: MatDialog,
    private alertMessage: MatSnackBar,
  ) { }
   ngOnInit(): void {
    this.Pokemons()
    this.searchControl.valueChanges.pipe(
    debounceTime(300),
    switchMap(query => {
    const safeQuery = query ?? ''; // convierte null en string vacío
    return this.getSuggestions(safeQuery);
    })
    ).subscribe(suggestions => {
    this.filteredSuggestions = suggestions;
  });
  }
  ngAfterViewInit(): void {
  this.paginator.page.subscribe(() => {
    const pageSize = this.paginator.pageSize;
    this.pageIndex = this.paginator.pageIndex;
    const offset = this.pageIndex * pageSize;
-
    this.loadPokemon(pageSize, offset);
    });

      // Carga inicial
      this.loadPokemon(this.paginator.pageSize, 0);
  }
  updatePagination(): void {
  const start = this.pageIndex * this.pageSize;
  const end = start + this.pageSize;
  this.paginatedList = this.pokemon.slice(start, end);
  }
  loadPokemon(limit: number, offset: number): void {
    const dialogRefL = this.openDialog('loading', 'Loading', 'Wait a minute');
    if(this.length == 1302){
      this.pokemonservice.getPokemons(limit, offset).subscribe({
        next: data => {
        this.pokemon = data;
        this.paginatedList = this.pokemon;
      },
      error: err => {
        dialogRefL.close();
            this.alertMessage.open("Error load registers", "Accept",
            {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            })
        console.error('Error al cargar Pokémon:', err);
      },
      complete: () => {
        dialogRefL.close();
      }
      });
    }else{
      dialogRefL.close()
      this.updatePagination();
    }
  }
  Pokemons(){
    const dialogRefL = this.openDialog('loading', 'Loading', 'Wait a minute');
    this.pokemonservice.getPokemons(10, 0).subscribe({
    next: data => {
      this.pokemon = data;
    },
    error: err => {
      dialogRefL.close();
          this.alertMessage.open("Error load registers", "Accept",
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
      console.error('Error al cargar Pokémon:', err);
    },
    complete: () => {
      dialogRefL.close();
    }
  });   
  }
  openDialog(type: string, title: string, message: string): MatDialogRef<ConfirmDialogComponent> {
  return this.dialog.open(ConfirmDialogComponent, {
    data: { type, title, message }
  });
  }
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  button(value: string | null){
    if (!value || value.trim() === '') {
    console.warn('No se puede buscar con un valor vacío');
    return;
    }
    const dialogRefL = this.openDialog('loading', 'Loading', 'Wait a minute');
    this.pokemonservice.getPokemonDetails(value).subscribe({
      next: data => {
      this.pokemon = [];
      this.pokemon[0] = data;
      this.paginatedList = this.pokemon
      this.length = this.pokemon.length
    },
    error: err => {
      dialogRefL.close();
          this.alertMessage.open("Error load registers", "Accept",
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
      console.error('Error al cargar Pokémon:', err);
    },
    complete: () => {
      dialogRefL.close();
    }
    })
  }
  pokemonbyTypeOrAbility(filterValue: string){
    const dialogRefL = this.openDialog('loading', 'Loading', 'Wait a minute');
    this.pokemonservice.getPokemonsTypeOrAbility(filterValue).subscribe(
        {
        next: data => {
        this.pokemon = data
        this.length = this.pokemon.length
        this.updatePagination()
          },
          error: err => {
            dialogRefL.close();
                this.alertMessage.open("Error load registers", "Accept",
                {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                })
            console.error('Error al cargar Pokémon:', err);
          },
          complete: () => {
            dialogRefL.close();
          }             
    })
  }
   getSuggestions(query: string ) {
    if (!query || query.length < 2) return [];
    return this.http.get<string[]>(`https://localhost:7079/suggestions?query=${query}`);
  }
}
