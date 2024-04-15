
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { makeQuestion } from "../../../../test/factories/make-question";
import { InMemoryQuestionRepository } from "../../../../test/repositories/in-memory-question-repository";
import { DeleteQuestionUseCase } from "./delete-question";
import { InMemoryCommentQuestionRepository } from "../../../../test/repositories/in-memory-comment-question-repository";
import { DeleteCommentQuestionUseCase } from "./delete-comment-question";
import { makeQuestionComment } from "../../../../test/factories/make-comment-question";


let inMemoryCommentQuestionRepository: InMemoryCommentQuestionRepository
let sut: DeleteCommentQuestionUseCase


describe("Should Delete comment question", () => {

    beforeEach(() => {
        inMemoryCommentQuestionRepository = new InMemoryCommentQuestionRepository()
        sut = new DeleteCommentQuestionUseCase(inMemoryCommentQuestionRepository)

    })

    it("Should Delete Comment question", async () => {

        const newQuestion = makeQuestionComment({ authorId: new UniqueID("author-1") }, new UniqueID("question-1"))

        await inMemoryCommentQuestionRepository.create(newQuestion)

        await sut.execute({
            authorId: "author-1",
            questionId: "question-1",

        })

        expect(inMemoryCommentQuestionRepository.items).toHaveLength(0)
    })


    //     it("Should Not Delete Answer By id from another User", async () => {

    //         const newQuestion = makeQuestion({ authorId: new UniqueID("author-1") }, new UniqueID("answerId-1"))

    //         await inMemoryQuestionrRepository.create(newQuestion)

    //         expect(() => {
    //             return sut.execute({
    //                 authorId: "author-2",
    //                 questionrId: "answerId-1",

    //             })
    //         }).rejects.toBeInstanceOf(Error)

    //     })
})