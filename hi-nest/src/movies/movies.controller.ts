import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CrreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAllMovies();
  }

  @Get('search')
  searchMovie(@Query('name') movieName: string) {
    return this.moviesService.searchMovie(movieName);
  }

  @Get(':id')
  getOneMovie(@Param('id') movieId: number): Movie {
    return this.moviesService.getOneMovie(movieId);
  }

  @Post()
  crateMovie(@Body() movieData: CrreateMovieDto) {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteMovie(movieId);
  }

  @Patch(':id')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ) {
    return this.moviesService.updateMovie(movieId, updateData);
  }
}
