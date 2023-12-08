import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  @Query(returns => String)        // 해당 쿼리의 리턴값 확인
  hi(){
    return 'hi';
  }
}
