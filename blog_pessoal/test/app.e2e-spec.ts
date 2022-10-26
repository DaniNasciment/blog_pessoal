import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'db_blogpessoal_test',
        autoLoadEntities: true,
        synchronize: true,
        logging:false,
        dropSchema: true
      }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

     });

     afterAll(async () => {
      await app.close(); 
  });

  it('01 - Deve Cadastrar Usuario', async() => {
    const resposta = await request (app.getHttpServer())
    .post('/usuario/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ''
    });

    expect(201)

    usuarioId = resposta.body.id;

  });

    it('02 - Deve Autenticar Usuario(login)', async () => {
      const resposta = await request (app.getHttpServer())
      .post('/auth/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot'
      }); 
      expect (200)
      token = resposta.body.token

    });
  

    it('03 - Não deve duplicar o usuario', async () => {
      request(app.getHttpServer())
      .post('/usuario/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha:'rootroot',
        foto: ''
      })
      expect (400)
    });

    it('04 - Deve listar todos os usuários', async () => {
      return request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .send({})
      expect(200)
    });

    it('05 - Deve atualizar um usuario', async () => {
      request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Root Atualizado',
        usuario: 'root@root.com',
        senha:'rootroot',
        foto: ''
      })
      .then(resposta => {
        expect("Root Atualizado").toEqual(resposta.body.nome)
      });
      expect(200)
    });

});
