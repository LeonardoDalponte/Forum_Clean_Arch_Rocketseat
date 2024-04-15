import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { AnswerComment } from "../../enterprise/entities/answer-comments"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { AnswersRepository } from "../repositories/answers-repository"
import { CommentAnswerRepository } from "../repositories/comment-answer-repository"
import { CommentQuestionRepository } from "../repositories/comment-question-repository"
import { QuestionRepository } from "../repositories/question-repository"

interface CommentAnswwerUseCaseRequest {
    authorId: string
    answerId: string
    content: string
}

interface CommentAnswerUseCaseResponse {
    answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
    constructor(private answerRepositoy: AnswersRepository, private commentAnswerRepository: CommentAnswerRepository) { }
    async execute({ authorId, content, answerId }: CommentAnswwerUseCaseRequest): Promise<CommentAnswerUseCaseResponse> {

        const question = await this.answerRepositoy.findById(answerId)

        if (!question) {
            throw new Error("Question not found!")
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueID(authorId),
            answerId: new UniqueID(answerId),
            content,
        })

        await this.commentAnswerRepository.create(answerComment)

        return {
            answerComment,
        }
    }
}
