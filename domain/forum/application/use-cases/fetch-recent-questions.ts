import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/question-repository"


interface FetchRecentCaseRequest {
    page: number
}

interface FetchRecentCaseResponse {
    question: Question[]
}

export class FetchRecentQuestionUseCase {
    constructor(private questionRepository: QuestionRepository) { }
    async execute({ page }: FetchRecentCaseRequest): Promise<FetchRecentCaseResponse> {
        const question = await this.questionRepository.findManyRecent({ page })

        return {
            question,
        }
    }
}
