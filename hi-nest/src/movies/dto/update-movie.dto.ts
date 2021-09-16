import { PartialType } from '@nestjs/mapped-types';
import { CrreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CrreateMovieDto) {}
