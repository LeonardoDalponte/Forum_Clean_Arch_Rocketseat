
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../test/factories/make-answers";
import { InMemoryAnswerRepository } from "../../../../test/repositories/in-memory-answer-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { InMemoryAnswerAttachmentRepository } from "../../../../test/repositories/in-memory-attachment-answer-repository";
import { makeAnswerAttachment } from "../../../../test/factories/make-attachment-answer";

let inMemoryAttachmentAnswerRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase


describe("Should Edit answer by id", () => {

    beforeEach(() => {
        inMemoryAttachmentAnswerRepository = new InMemoryAnswerAttachmentRepository()
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new EditAnswerUseCase(inMemoryAnswerRepository, inMemoryAttachmentAnswerRepository)

    })

    it("Should Edit Answer By id", async () => {

        const newAnswer = makeAnswer({ authorId: new UniqueID("author-1") }, new UniqueID("answerId-1"))

        await inMemoryAnswerRepository.create(newAnswer)

        inMemoryAttachmentAnswerRepository.items.push(
            makeAnswerAttachment({ answerId: newAnswer.id, attachmentId: new UniqueID("1") }),
            makeAnswerAttachment({ answerId: newAnswer.id, attachmentId: new UniqueID("2") }),
        )

        await sut.execute({
            authorId: "author-1",
            answerId: newAnswer.id.ToValue(),
            content: "Resposta Nova",
            attachmentid: ["1", "3"],
        })

        expect(inMemoryAnswerRepository.items[0]).toMatchObject({
            content: "Resposta Nova"
        })
        expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueID("1") }),
            expect.objectContaining({ attachmentId: new UniqueID("3") }),
        ]
        )
    })

    it("Should Not Edit Answer By id from another User", async () => {

        const newAnswer = makeAnswer({ authorId: new UniqueID("author-1") }, new UniqueID("answerId-1"))

        await inMemoryAnswerRepository.create(newAnswer)

        expect(() => {
            return sut.execute({
                answerId: newAnswer.id.ToValue(),
                authorId: "author-2",
                content: "Pergunta teste",
                attachmentid: []

            })
        }).rejects.toBeInstanceOf(Error)

    })

})




