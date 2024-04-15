import { CommentQuestionRepository } from "../repositories/comment-question-repository"


interface DeleteCommentQuestionUserCaseRequest {
    questionId: string
    authorId: string
}

interface DeleteCommentQuestionUserCaseResponse {

}

export class DeleteCommentQuestionUseCase {
    constructor(private CoomentQuestionRepository: CommentQuestionRepository) { }
    async execute({ questionId, authorId }: DeleteCommentQuestionUserCaseRequest): Promise<DeleteCommentQuestionUserCaseResponse> {

        const question = await this.CoomentQuestionRepository.findById(questionId)

        if (!question) {
            throw new Error("nada encontardo")
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error("Not Allowed")
        }

        await this.CoomentQuestionRepository.delete(question)

        return {
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })