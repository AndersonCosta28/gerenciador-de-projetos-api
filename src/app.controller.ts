import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './services/auth.service';
import { UserAuthDto } from './util/user-auth.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(LocalAuthGuard)
  @ApiBody({type: UserAuthDto})
  @ApiOperation({summary:"Essa rota é para fazer o login", description: "Entre com usuário e senha válido, ele retornará um Token para ser usado para acessar as outras rotas"}) // https://stackoverflow.com/questions/60114023/how-to-add-summary-and-body-manually-in-swagger-nestjs
  @Post('auth/login')
  async login(@Request()req, @Body() user: UserAuthDto ) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({summary:"Retorna dados do usuário corrente da requisição"})
  getProfile(@Request() req) {
    return req.user;
  }

}
