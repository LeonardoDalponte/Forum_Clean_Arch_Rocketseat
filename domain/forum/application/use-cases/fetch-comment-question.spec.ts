
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { InMemoryCommentQuestionRepository } from "../../../../test/repositories/in-memory-comment-question-repository";
import { FetchComentQuestionUseCase } from "./fetch-question-comments";
import { makeQuestionComment } from "../../../../test/factories/make-comment-question";


let inMemoryCommentQuestionRepository: InMemoryCommentQuestionRepository
let sut: FetchComentQuestionUseCase


describe("Fetch coments by Question", () => {

    beforeEach(() => {
        inMemoryCommentQuestionRepository = new InMemoryCommentQuestionRepository()
        sut = new FetchComentQuestionUseCase(inMemoryCommentQuestionRepository)

    })

    it("Should be able to fetch coments Questions, ", async () => {

        await inMemoryCommentQuestionRepository.create(makeQuestionComment({ questionId: new UniqueID("question-1") }))
            await inMemoryCommentQuestionRepository.create(makeQuestionComment({ questionId: new UniqueID("question-1") }))
        await inMemoryCommentQuestionRepository.create(makeQuestionComment({ questionId: new UniqueID("question-1") }))

        const { questionComment } = await sut.execute({
            questionId: "question-1",
            page: 1,
        })

        expect(questionComment).toHaveLength(3)

    })


    // it("Should be able to fetch paginate Recent Questions, ", async () => {

    //     for (let i = 1; i <= 22; i++) {
    //         await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueID("1") }))
    //     }

    //     const { answer } = await sut.execute({
    //         questionId: "1",
    //         page: 2
    //     })

    //     expect(answer).toHaveLength(2)

    // })
})
