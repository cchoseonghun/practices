import { Request } from 'express';

interface ISlugService {
  getSlug(request: Request): string | null;
}

export class SubdomainSlugService implements ISlugService {
  getSlug(request: Request): string {
    const { headers: { host } } = request;
    const split = host.split('.');
    if (split.length < 2) {  // localhost 에서의 테스트를 위해 2로 변경
      return null;
    }
    return split[0];
  }
}

export class QueryParamSlugService implements ISlugService {
  getSlug(request: Request): string {
    const { query } = request;
    if (!query.pokemon) {
      return null;
    }
    return query.pokemon.toString();
  }
}

export class CombinedSlugService implements ISlugService {
  constructor(private services: ISlugService[]) {}

  getSlug(request: Request): string {
    for (const service of this.services) {
      const slug = service.getSlug(request);
      if (slug) {
        return slug;
      }
    }
    return null;
  }
}
