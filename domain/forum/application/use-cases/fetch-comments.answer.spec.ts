
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { FetchComentQuestionUseCase } from "./fetch-question-comments";
import { makeQuestionComment } from "../../../../test/factories/make-comment-question";
import { InMemoryCommentAnswerRepository } from "../../../../test/repositories/in-memory.comment-answer-repository";
import { FetchComentAnswerUseCase } from "./fetch-comment-answer";
import { makeCommentAnswer } from "../../../../test/factories/make-comment-answer";


let inMemoryCommentAnswerRepository: InMemoryCommentAnswerRepository
let sut: FetchComentAnswerUseCase


describe("Fetch coments by Question", () => {

    beforeEach(() => {
        inMemoryCommentAnswerRepository = new InMemoryCommentAnswerRepository()
        sut = new FetchComentAnswerUseCase(inMemoryCommentAnswerRepository)

    })

    it("Should be able to fetch coments Questions, ", async () => {

        await inMemoryCommentAnswerRepository.create(makeCommentAnswer({ answerId: new UniqueID("question-1") }))
        await inMemoryCommentAnswerRepository.create(makeCommentAnswer({ answerId: new UniqueID("question-1") }))
        await inMemoryCommentAnswerRepository.create(makeCommentAnswer({ answerId: new UniqueID("question-1") }))

        const { answerCommment } = await sut.execute({
            answerId: "question-1",
            page: 1,
        })

        expect(answerCommment).toHaveLength(3)

    })

})
