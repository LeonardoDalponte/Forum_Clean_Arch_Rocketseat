
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { makeCommentAnswer } from "../../../../test/factories/make-comment-answer";
import { InMemoryCommentAnswerRepository } from "../../../../test/repositories/in-memory.comment-answer-repository";
import { DeleteCommentAnswerUseCase } from "./delete-comment-answer";


let inMemoryCommenAnswerRepository: InMemoryCommentAnswerRepository
let sut: DeleteCommentAnswerUseCase


describe("Should Delete comment answer", () => {

    beforeEach(() => {
        inMemoryCommenAnswerRepository = new InMemoryCommentAnswerRepository()
        sut = new DeleteCommentAnswerUseCase(inMemoryCommenAnswerRepository)

    })

    it("Should Delete Comment answer", async () => {

        const newQuestion = makeCommentAnswer({ authorId: new UniqueID("author-1") }, new UniqueID("question-1"))

        await inMemoryCommenAnswerRepository.create(newQuestion)

        await sut.execute({
            authorId: "author-1",
            answerId: "question-1",

        })

        expect(inMemoryCommenAnswerRepository.items).toHaveLength(0)
    })

})