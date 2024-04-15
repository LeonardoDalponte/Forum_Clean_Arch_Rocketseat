import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { CommentQuestionRepository } from "../repositories/comment-question-repository"
import { QuestionRepository } from "../repositories/question-repository"

interface CommentOnQuestionUseCaseRequest {
    authorId: string
    questionId: string
    content: string
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
    constructor(private questionRepository: QuestionRepository, private commentQuestionRepository: CommentQuestionRepository) { }
    async execute({ authorId, content, questionId }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {

        const question = await this.questionRepository.findByid(questionId)

        if (!question) {
            throw new Error("Question not found!")
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueID(authorId),
            questionId: new UniqueID(questionId),
            content,
        })

        await this.commentQuestionRepository.create(questionComment)

        return {
            questionComment,
        }
    }
}
