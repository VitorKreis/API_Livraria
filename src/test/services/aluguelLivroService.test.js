import { describe, expect } from "@jest/globals";
import AluguelLivroService from "../../services/aluguelLivroService"


const aluguelLivro = new AluguelLivroService();


describe("Testando nova funcinalidade de aluguel service", () =>{
    test("Retornar a data de devolução do livro validando a quantidade de dias alugados", async () =>{
        const dataAlugada = new Date("2023-01-05")
        const diasAlugado = 5;
        const dataDevolucaoMock = new Date('2023-01-10')


        const dataDevolucao = await aluguelLivro.calcularDataDevolucao(dataAlugada, diasAlugado)

        expect(dataDevolucao).toStrictEqual(dataDevolucaoMock);


    })
})