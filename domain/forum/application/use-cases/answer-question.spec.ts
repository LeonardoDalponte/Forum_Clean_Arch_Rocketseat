
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAnswerRepository } from "../../../../test/repositories/in-memory-answer-repository";
import { AnswerQuestionUseCase } from "./answer.question";
import { UniqueID } from "../../../../core/entities/unique-entity-id";




let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe("Create Answer", () => {

    beforeEach(() => {
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)

    })

    it("Should be able to create an Answer", async () => {

        const { answer } = await sut.execute({
            instructorId: "1",
            content: "Qual é meu nome?",
            questionId: "1",
            attachmentId: ["1", "2"]

        })

        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
        expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueID("1") }),
            expect.objectContaining({ attachmentId: new UniqueID("2") })
        ])


    })

})