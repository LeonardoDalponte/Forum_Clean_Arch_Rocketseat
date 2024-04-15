
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../test/factories/make-answers";
import { makeQuestion } from "../../../../test/factories/make-question";
import { InMemoryCommentQuestionRepository } from "../../../../test/repositories/in-memory-comment-question-repository";
import { InMemoryQuestionRepository } from "../../../../test/repositories/in-memory-question-repository";
import { ChooseBestQuestionUseCase } from "./choose-best-question";
import { CommentOnQuestionUseCase } from "./comment-on-question";



let inMemoryCommentQuestionRepository: InMemoryCommentQuestionRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CommentOnQuestionUseCase


describe("Should to comment on question", () => {

    beforeEach(() => {
        inMemoryCommentQuestionRepository = new InMemoryCommentQuestionRepository()
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new CommentOnQuestionUseCase(inMemoryQuestionRepository, inMemoryCommentQuestionRepository)

    })

    it("Should be able to comment on question", async () => {
        const question = makeQuestion()
       

        await inMemoryQuestionRepository.create(question)


        await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: "comentario teste"

        })

        expect(inMemoryCommentQuestionRepository.items[0].content).toEqual("comentario teste")

    })
})