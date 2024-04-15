import { Answer } from "../../enterprise/entities/answer"
import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/question-repository"


interface GetSlugCaseRequest {
    slug: string
}

interface GetSlugCaseResponse {
    question: Question
}

export class GetQuestionBySlug {
    constructor(private questionRepository: QuestionRepository) { }
    async execute({ slug }: GetSlugCaseRequest): Promise<GetSlugCaseResponse> {
        const question = await this.questionRepository.FindBySlug(slug)

        if (!question) {
            throw new Error("erro")
        }
        return {
            question,
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })