import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface DeleteAnswerUseCaseRequest {
    answerId: string
    authorId: string
}

interface DeleteAnswerUseCaseResponse {

}

export class CreateQuestionUseCase {
    constructor(private answerRepository: AnswersRepository) { }
    async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {


        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error("nada encontardo")
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error("Not Allowed")
        }


        await this.answerRepository.delete(answer)

        return {}
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })