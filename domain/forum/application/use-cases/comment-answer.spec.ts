
import { beforeEach, describe, expect, it } from "vitest";
import { makeQuestion } from "../../../../test/factories/make-question";
import { InMemoryCommentAnswerRepository } from "../../../../test/repositories/in-memory.comment-answer-repository";
import { InMemoryAnswerRepository } from "../../../../test/repositories/in-memory-answer-repository";
import { CommentOnAnswerUseCase } from "./comment-answer";
import { makeAnswer } from "../../../../test/factories/make-answers";
import { aN } from "vitest/dist/reporters-P7C2ytIv";




let inMemoryCommentAnswerRepository: InMemoryCommentAnswerRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: CommentOnAnswerUseCase


describe("Should to comment on answer", () => {

    beforeEach(() => {
        inMemoryCommentAnswerRepository = new InMemoryCommentAnswerRepository()
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new CommentOnAnswerUseCase(inMemoryAnswerRepository, inMemoryCommentAnswerRepository)

    })

    it("Should be able to comment on answer", async () => {
        const answer = makeAnswer()


        await inMemoryAnswerRepository.create(answer)


        await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: "comentario teste"

        })

        expect(inMemoryCommentAnswerRepository.items[0].content).toEqual("comentario teste")

    })
})