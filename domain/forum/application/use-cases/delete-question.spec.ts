
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueID } from "../../../../core/entities/unique-entity-id";
import { makeQuestion } from "../../../../test/factories/make-question";
import { InMemoryQuestionRepository } from "../../../../test/repositories/in-memory-question-repository";
import { DeleteQuestionUseCase } from "./delete-question";


let inMemoryQuestionrRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase


describe("Should Delete answer by id", () => {

    beforeEach(() => {
        inMemoryQuestionrRepository = new InMemoryQuestionRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionrRepository)

    })

    it("Should Delete Answer By id", async () => {

        const newQuestion = makeQuestion({ authorId: new UniqueID("author-1") }, new UniqueID("answerId-1"))

        await inMemoryQuestionrRepository.create(newQuestion)

        await sut.execute({
            authorId: "author-1",
            questionrId: "answerId-1",

        })
        expect(inMemoryQuestionrRepository.items).toHaveLength(0)


    })


    it("Should Not Delete Answer By id from another User", async () => {

        const newQuestion = makeQuestion({ authorId: new UniqueID("author-1") }, new UniqueID("answerId-1"))

        await inMemoryQuestionrRepository.create(newQuestion)

        expect(() => {
            return sut.execute({
                authorId: "author-2",
                questionrId: "answerId-1",

            })
        }).rejects.toBeInstanceOf(Error)

    })
})