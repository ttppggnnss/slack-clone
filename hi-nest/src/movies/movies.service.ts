import { Injectable, NotFoundException } from '@nestjs/common';
import { CrreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  getOneMovie(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteMovie(id: number): void {
    this.getOneMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  createMovie(movieData: CrreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOneMovie(id);
    this.deleteMovie(id);
    this.movies.push({ ...movie, ...updateData });
  }

  searchMovie(movieName: string): Movie[] {
    return this.movies.filter((movie) => movie.title.indexOf(movieName) > -1);
  }
}
