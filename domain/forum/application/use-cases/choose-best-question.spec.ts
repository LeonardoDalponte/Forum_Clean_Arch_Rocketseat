
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { makeQuestion } from "../../../../test/factories/make-question";
import { InMemoryQuestionRepository } from "../../../../test/repositories/in-memory-question-repository";
import { ChooseBestQuestionUseCase } from "./choose-best-question";
import { InMemoryAnswerRepository } from "../../../../test/repositories/in-memory-answer-repository";
import { makeAnswer } from "../../../../test/factories/make-answers";


let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryQuestionrRepository: InMemoryQuestionRepository
let sut: ChooseBestQuestionUseCase


describe("Choose best question", () => {

    beforeEach(() => {
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        inMemoryQuestionrRepository = new InMemoryQuestionRepository()
        sut = new ChooseBestQuestionUseCase(inMemoryQuestionrRepository, inMemoryAnswerRepository)

    })

    it("Should to Choose best Question", async () => {
        const question = makeQuestion()
        const answer = makeAnswer({
            questionId: question.id
        })

        await inMemoryAnswerRepository.create(answer)
        await inMemoryQuestionrRepository.create(question)


        await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString(),

        })
        expect(inMemoryQuestionrRepository.items[0].bestAnswerId).toEqual(question.bestAnswerId)

    })


    it("Should Not able  to Choose another user question be answer", async () => {

        const question = makeQuestion({
            authorId: new UniqueID("author-1")
        })

        const answer = makeAnswer({
            questionId: question.id
        })

        await inMemoryAnswerRepository.create(answer)
        await inMemoryQuestionrRepository.create(question)

        expect(() => {
            return sut.execute({
                answerId: answer.id.toString(),
                authorId: "author-2"

            })
        })
            .rejects.toBeInstanceOf(Error)


    })
})