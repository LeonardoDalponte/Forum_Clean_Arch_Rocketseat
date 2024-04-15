import { QuestionRepository } from "../repositories/question-repository"


interface DeteteQuestionUserCaseRequest {
    questionrId: string
    authorId: string
}

interface DeteteQuestionUserCaseResponse {

}

export class DeleteQuestionUseCase {
    constructor(private questionRepository: QuestionRepository) { }
    async execute({ questionrId, authorId }: DeteteQuestionUserCaseRequest): Promise<DeteteQuestionUserCaseResponse> {

        const question = await this.questionRepository.findByid(questionrId)

        if (!question) {
            throw new Error("nada encontardo")
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error("Not Allowed")
        }

        const deleteAnswer = await this.questionRepository.delete(question)

        return {
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })