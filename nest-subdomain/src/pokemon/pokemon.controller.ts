import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonGuard } from './pokemon.guard';
import { Request } from 'express';
import { PokemonDto } from './pokemon.dto';

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @UseGuards(PokemonGuard)
  @Render('pokemon')
  getPokemon(@Req() request: Request): Promise<PokemonDto> {
    return this.pokemonService.getPokemon(request.slug);
  }
}
