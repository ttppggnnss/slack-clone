import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  function testCreate() {
    service.createMovie({
      title: 'Test Movie',
      year: 2021,
      genres: ['test'],
      director: 't est',
    });
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    testCreate();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return an array', () => {
      const result = service.getAllMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOneMovie', () => {
    it('should return a test movie', () => {
      const movie = service.getOneMovie(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('Test Movie');
      expect(movie.year).toEqual(2021);
      expect(movie.genres).toEqual(['test']);
      expect(movie.director).toEqual('t est');
    });

    it('should throw 404 error', () => {
      try {
        service.getOneMovie(0);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 0 not found.');
      }
    });
  });

  describe('deleteOneMovie', () => {
    it('deletes a movie', () => {
      const beforeDelete = service.getAllMovies().length;
      service.deleteMovie(1);
      const afterDelete = service.getAllMovies().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteMovie(0);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 0 not found.');
      }
    });
  });

  describe('createMovie', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAllMovies().length;
      testCreate();
      const afterCreate = service.getAllMovies().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      service.updateMovie(1, {
        title: 'Update Test',
      });
      const movie = service.getOneMovie(1);
      expect(movie.title).toEqual('Update Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.updateMovie(0, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 0 not found.');
      }
    });
  });

  describe('searchMovie', () => {
    it('should search a movie', () => {
      const searched = service.searchMovie('Test Movie').length;
      expect(searched).toEqual(1);
    });
  });
});
