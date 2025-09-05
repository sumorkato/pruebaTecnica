import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//configuracion de cabezeras
const httpOptions = {
   headers: new HttpHeaders( {
    'Content-Type': 'application/json;odata=nometadata',
    'Accept': 'application/json;odata=nometadata',
    'Ocp-Apim-Subscription-Key': environment.subscriptioKey,

  })
}
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
     private http: HttpClient
  ) { }


    getPokemons(limit:number, offset: number): Observable<any>{
        return this.http.get(environment.API_SERVICES + "PokemonList?limit="+limit + "&offset=" + offset, httpOptions)
    }
    getPokemonDetails(nameOrId: any): Observable<any>{
        return this.http.get(environment.API_SERVICES + "NameOrId?aux=" + nameOrId, httpOptions)
    }
    getPokemonsTypeOrAbility(TypeOrAbility: any): Observable<any>{
        return this.http.get(environment.API_SERVICES + "TypeOrAbility?aux=" + TypeOrAbility, httpOptions)
    }
}
