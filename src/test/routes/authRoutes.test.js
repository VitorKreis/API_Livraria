import request from 'supertest'
import { afterEach, beforeEach, describe, expect } from '@jest/globals'
import app from "../../app"

let server;
beforeEach(()=>{
    const port = 3000
    server = app.listen(port)
})


afterEach(() =>{
    server.close()
})


describe("Testes da rota de login (POST)", () =>{
    test("O login deve possuir um e-mail e senha para se autentica", async () =>{
        const userMock = {
            email: "DarkMage@gmail.com"
        }

        await request(app)
        .post("/login")
        .send(userMock)
        .expect(500)
        .expect('"A senha de usuario é obrigatório."')
    })

    test("O login deve validar se o usuário está cadastrado", async ()=>{
        const userMock = {
            email: "Darkmagexd@gmail.com",
            senha: 12345
        }

        await request(app)
            .post("/login")
            .send(userMock)
            .expect(500)
            .expect('"Usuario não cadastrado."')
        
    })


    test("O login deve validar e-mail e senha incorreto", async () =>{

        const userMock = {
            email: "DarkMagexd@gmail.com",
            senha: "1234"
        }

        await request(app)
        .post("/login")
        .send(userMock)
        .expect(500)
        .expect('"Usuario ou senha invalido."')
    })

    test("O login deve validar se está sendo retornado um accessToken", async ()=>{
        const userMock = {
            email: "DarkMagexd@gmail.com",
            senha: "12345"
        }

        const response = await request(app)
            .post("/login")
            .send(userMock)
            .expect(201)
        
        console.log(response)
        expect(response.body).not.toBeNull();
    })
})
