import { CommentAnswerRepository } from "../repositories/comment-answer-repository"



interface DeleteCommentAnswerUserCaseRequest {
    answerId: string
    authorId: string
}

interface DeleteCommentAnswerUserCaseResponse {

}

export class DeleteCommentAnswerUseCase {
    constructor(private CoomentAnswerRepository: CommentAnswerRepository) { }
    async execute({ answerId, authorId }: DeleteCommentAnswerUserCaseRequest): Promise<DeleteCommentAnswerUserCaseResponse> {

        const answer = await this.CoomentAnswerRepository.findById(answerId)

        if (!answer) {
            throw new Error("nada encontardo")
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error("Not Allowed")
        }
        
        await this.CoomentAnswerRepository.delete(answer)

        return {
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })