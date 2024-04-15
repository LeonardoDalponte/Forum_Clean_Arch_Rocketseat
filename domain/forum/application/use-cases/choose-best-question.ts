import { Question } from "../../enterprise/entities/question"
import { AnswersRepository } from "../repositories/answers-repository"
import { QuestionRepository } from "../repositories/question-repository"

interface ChooseBestQuestionUseCaseRequest {
    authorId: string
    answerId: string
}

interface ChooseBestQuestionUseCaseResponse {
    question: Question
}

export class ChooseBestQuestionUseCase {
    constructor(private questionRepository: QuestionRepository, private answerRepository: AnswersRepository) { }
    async execute({ answerId, authorId }: ChooseBestQuestionUseCaseRequest): Promise<ChooseBestQuestionUseCaseResponse> {

        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error("answer not found")
        }

        const question = await this.questionRepository.findByid(answer.questionId.toString())

        if (!question) {
            throw new Error("question not found")
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error("Not Allowed")
        }

        question.bestAnswerId = answer.id

        await this.questionRepository.save(question)


        return {
            question,
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })