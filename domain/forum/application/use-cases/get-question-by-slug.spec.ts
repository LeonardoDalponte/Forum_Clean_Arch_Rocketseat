
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryAnswerRepository } from "../../../../test/repositories/in-memory-answer-repository";

import { Slug } from "../../enterprise/entities/value-objects/slug";
import { GetQuestionBySlug } from "./get-question-by-slug";
import { makeQuestion } from "../../../../test/factories/make-question";
import { InMemoryQuestionRepository } from "../../../../test/repositories/in-memory-question-repository";


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlug


describe("Should be able by slug", () => {

    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new GetQuestionBySlug(inMemoryQuestionRepository)

    })

    it("Should be able to get a answer by slug", async () => {

        const newAnswer = makeQuestion({
            slug: Slug.create("example-answer")
        })

        await inMemoryQuestionRepository.create(newAnswer)

        const { question } = await sut.execute({
            slug: "example-answer"
        })

        expect(question.id).toBeTruthy()
    })


})