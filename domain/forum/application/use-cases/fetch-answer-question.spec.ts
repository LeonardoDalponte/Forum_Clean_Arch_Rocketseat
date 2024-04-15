
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../test/factories/make-answers";
import { InMemoryAnswerRepository } from "../../../../test/repositories/in-memory-answer-repository";
import { FetchAnswerQuestionUseCase } from "./fetch-question-answer";


let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchAnswerQuestionUseCase


describe("Fetch answer by Question", () => {

    beforeEach(() => {
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new FetchAnswerQuestionUseCase(inMemoryAnswerRepository)

    })

    it("Should be able to fetch Recent Questions, ", async () => {

        await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueID("question-1") }))
        await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueID("question-1") }))
        await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueID("question-1") }))

        const { answer } = await sut.execute({
            questionId: "question-1",
            page: 1,
        })

        expect(answer).toHaveLength(3)

    })


    it("Should be able to fetch paginate Recent Questions, ", async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueID("1") }))
        }

        const { answer } = await sut.execute({
            questionId: "1",
            page: 2
        })

        expect(answer).toHaveLength(2)

    })
})
