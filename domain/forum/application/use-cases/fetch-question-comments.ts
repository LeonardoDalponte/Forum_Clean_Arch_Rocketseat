import { QuestionComment } from "../../enterprise/entities/question-comment"
import { CommentQuestionRepository } from "../repositories/comment-question-repository"


interface FetcCommentshQuestionCaseRequest {
    page: number
    questionId: string
}

interface FetchCommentsQuestionCaseResponse {
    questionComment: QuestionComment[]
}

export class FetchComentQuestionUseCase {
    constructor(private commentQuestionRepository: CommentQuestionRepository) { }
    async execute({ page, questionId }: FetcCommentshQuestionCaseRequest): Promise<FetchCommentsQuestionCaseResponse> {
        const questionComment = await this.commentQuestionRepository.findManyQuestionByid(questionId, { page })


        return {
            questionComment,
        }
    }
}
