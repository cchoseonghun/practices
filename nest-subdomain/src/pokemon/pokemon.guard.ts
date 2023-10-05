import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CombinedSlugService } from './slug.service';

@Injectable()
export class PokemonGuard implements CanActivate {
  constructor(private slugService: CombinedSlugService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const slug = this.slugService.getSlug(request);
    if (!slug) {
      throw new BadRequestException('Invalid request. Missing slug');
    }
    request.slug = slug;
    return true;
  }
}
