import { Answer } from "../../enterprise/entities/answer"
import { Question } from "../../enterprise/entities/question"
import { AnswersRepository } from "../repositories/answers-repository"
import { QuestionRepository } from "../repositories/question-repository"


interface FetchQuenstionAnswerCaseRequest {
    page: number
    questionId: string
}

interface FetchQuenstionAnswerCaseResponse {
    answer: Answer[]
}

export class FetchAnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRepository) { }
    async execute({ page, questionId }: FetchQuenstionAnswerCaseRequest): Promise<FetchQuenstionAnswerCaseResponse> {
        const answer = await this.answersRepository.findManyByQuestionId(questionId, { page })

        return {
            answer,
        }
    }
}
