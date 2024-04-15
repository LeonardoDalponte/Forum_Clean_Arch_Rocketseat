
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionRepository } from "../../../../test/repositories/in-memory-question-repository";
import { FetchRecentQuestionUseCase } from "./fetch-recent-questions";
import { makeQuestion } from "../../../../test/factories/make-question";


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionUseCase


describe("Fetch Recent Question", () => {

    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new FetchRecentQuestionUseCase(inMemoryQuestionRepository)

    })

    it("Should be able to fetch Recent Questions, ", async () => {          

        await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 23) }))
        await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }))
        await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }))

        const { question } = await sut.execute({
            page: 1
        })

        expect(question).toEqual([
            expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
        ])                                                                                                                                          
    })


    it("Should be able to fetch paginate Recent Questions, ", async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryQuestionRepository.create(makeQuestion())
        }

        const { question } = await sut.execute({
            page: 2
        })

        expect(question).toHaveLength(2)

    })
})
