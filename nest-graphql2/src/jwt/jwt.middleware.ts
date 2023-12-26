import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "./jwt.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService, 
    private readonly usersService: UsersService, 
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
    // {
      //   "x-jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAzMTM1NDkxfQ.J1TUiY6ioga4Ff8RWnyFrdiyuB7CoW2IG0YRjdzSUVo"
      // }
      // GraphQL Playground 하단 HTTP HEADERS에 위와 같이 세팅하면 headers가 세팅된다. 
      const token = req.headers['x-jwt'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const { user } = await this.usersService.findById(decoded['id']);
          // 위 findById의 결과인 user가 없을 경우에 대한 예외처리 필요
          req['user'] = user;
        }
      } catch (e) {}
    }
    next();
  }
}
