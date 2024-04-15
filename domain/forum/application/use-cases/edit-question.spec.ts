
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { makeQuestionAttachment } from "../../../../test/factories/make-attachment-question";
import { makeQuestion } from "../../../../test/factories/make-question";
import { InMemoryQuestionAttachmentRepository } from "../../../../test/repositories/in-memory-attachments-question-repository";
import { InMemoryQuestionRepository } from "../../../../test/repositories/in-memory-question-repository";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionrRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase


describe("Should Edit answer by id", () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository()
        inMemoryQuestionrRepository = new InMemoryQuestionRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionrRepository, inMemoryQuestionAttachmentRepository)

    })

    it("Should Edit Answer By id", async () => {

        const newQuestion = makeQuestion({ authorId: new UniqueID("author-1") }, new UniqueID("questionId-1"))

        await inMemoryQuestionrRepository.create(newQuestion)

        inMemoryQuestionAttachmentRepository.items.push(
            makeQuestionAttachment({ questionId: newQuestion.id, attachmentId: new UniqueID("1") }),
            makeQuestionAttachment({ questionId: newQuestion.id, attachmentId: new UniqueID("2") }),
        )

        await sut.execute({
            authorId: "author-1",
            questionId: newQuestion.id.ToValue(),
            title: "Uma Pergunta nova",
            content: "Pergunta Nova",
            attachmentsid: ["1", "3"]
        })
        expect(inMemoryQuestionrRepository.items[0]).toMatchObject({
            title: "Uma Pergunta nova",
            content: "Pergunta Nova"
        })
        expect(inMemoryQuestionrRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionrRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueID("1") }),
            expect.objectContaining({ attachmentId: new UniqueID("3") }),
        ]
        )
    })

    it("Should Not Edit Answer By id from another User", async () => {

        const newQuestion = makeQuestion({ authorId: new UniqueID("author-1") }, new UniqueID("questionId-1"))

        await inMemoryQuestionrRepository.create(newQuestion)

        expect(() => {
            return sut.execute({
                questionId: newQuestion.id.ToValue(),
                authorId: "author-2",
                title: "Uma Pergunta teste",
                content: "Pergunta teste",
                attachmentsid: []

            })
        }).rejects.toBeInstanceOf(Error)

    })
})




