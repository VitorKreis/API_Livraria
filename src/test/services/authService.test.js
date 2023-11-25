import { expect, jest } from "@jest/globals"
import AuthService from "../../services/authService"
import bcryptjs from 'bcryptjs';


describe("Testando a authService.cadastrarUsuario()", () =>{
    const authService = new AuthService()
    
    test("Usuario deve conter senha", async () =>{
        //arrage
        const MokUsuario = {
            nome: "Vitor",
            email: "DarkMagexd@gmail.com"
        }

        //act
        const user = authService.cadastrarUsuario(MokUsuario);

        //asserts
        await expect(user).rejects.toThrow("Usuario deve conter uma senha!!")
    })

    test("Não pode ser cadastrado um usuário com e-mail duplicado", async () =>{
        const MokUsuario = {
            nome: "Vitor",
            email: "DarkMagexd@gmail.com",
            senha: "12345"
        }

        const user = authService.cadastrarUsuario(MokUsuario)

        await expect(user).rejects.toThrow("Usuario ja foi cadastrado!!")
    })

    test("A senha de usuário precisa ser criptografada quando for salva no banco de dados", async ()=>{

        const MokUsuario = {
            nome: "Vitor",
            email: "DarkMagexd@gmail.com",
            senha: "12345"
        }
        const auth_Service = new AuthService()

        auth_Service.cadastrarUsuario = jest.fn().mockReturnValue({
            id: 5,
            nome : MokUsuario.nome,
            email: MokUsuario.email,
            senha: await bcryptjs.hash(MokUsuario.senha, 8),
        })
    
        const user = await auth_Service.cadastrarUsuario(MokUsuario);
        
        expect(user.senha).not.toEqual(MokUsuario.senha);

    })

    test("Ao cadastrar um usuário, validar o retorno das informações do usuário", async () => {
        const MokUsuario = {
            nome: "Vitor",
            email: "DarkMagexd@gmail.com",
            senha: "12345"
        }

        const auth_Service = new AuthService()

        auth_Service.cadastrarUsuario = jest.fn().mockReturnValue({
            id: 5,
            nome : MokUsuario.nome,
            email: MokUsuario.email,
            senha: await bcryptjs.hash(MokUsuario.senha, 8),
        })

        const user = await auth_Service.cadastrarUsuario(MokUsuario);

        expect(user).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                senha: expect.any(String),
                nome: expect.any(String),
                email: expect.any(String)
            })
        )
    })

}) 
