import { AnswerComment } from "../../enterprise/entities/answer-comments"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { CommentAnswerRepository } from "../repositories/comment-answer-repository"
import { CommentQuestionRepository } from "../repositories/comment-question-repository"


interface FetcCommentAnswerCaseRequest {
    page: number
    answerId: string
}

interface FetchCommentAnswerCaseResponse {
    answerCommment: AnswerComment[]
}

export class FetchComentAnswerUseCase {
    constructor(private commentQuestionRepository: CommentAnswerRepository) { }
    async execute({ page, answerId }: FetcCommentAnswerCaseRequest): Promise<FetchCommentAnswerCaseResponse> {
        const answerCommment = await this.commentQuestionRepository.findManyAnswerByid(answerId, { page })


        return {
            answerCommment,
        }
    }
}
