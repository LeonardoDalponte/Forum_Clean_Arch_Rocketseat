
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAnswerRepository } from "../../../../test/repositories/in-memory-answer-repository";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionRepository } from "../../../../test/repositories/in-memory-question-repository";
import { UniqueID } from "../../../../core/entities/unique-entity-id";



let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe("Create answer", () => {

    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionRepository)

    })

    it("Should be able to create an Answer", async () => {

        const { question } = await sut.execute({
            authorId: "1",
            title: "Nova pergunta",
            content: "Qual é meu nome?",
            attachmentsid: ["1", "2"]

        })

        expect(question.id).toBeTruthy()
        expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)
        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueID("1") }),
            expect.objectContaining({ attachmentId: new UniqueID("2") })
        ])
    })

})