import { describe, expect } from "@jest/globals"
import db from "../../db/dbconfig"



describe("Teste do DBConfig", () =>{
    test("Teste de conexão com o banco de dados", async () =>{
        const autorMock = {
            nome: "Luiz",
            nacionalidade: "Brasileiro",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        const autorSalvo = await db('autores').insert(autorMock)
        .then((data) => db("autores").where("id", data[0]))
        .then((autor) => autor[0])

        expect(autorSalvo.nome).toBe(autorMock.nome);


        await db("autores").where({id:autorSalvo.id}).del()
    })

    let livroId;
    test("Inserçao de uma livro no banco de dados", async () =>{
        const livroMock = {
            titulo : "Hobbit",
            paginas: 397,
            editora_id: 4,
            autor_id : 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }


        const livroSalvo = await db("livros").insert(livroMock)
        .then((resp) => db("livros").where("id", resp[0]))
        .then((livro) => livro[0])

        expect(livroSalvo.paginas).toBe(livroMock.paginas);

        livroId = livroSalvo.id 
    })

    test("Buscar um livro no db", async () => {
        const livro = await db("livros").where({id: livroId})
    .then((res) => res[0])

        expect(livro.titulo).toBe("Hobbit")
    })

    test("Deletando um livro no db", async () => {
        const livroDeletado = await db("livros").where({id : livroId}).del()


        expect(livroDeletado).toEqual(1);
    })
})