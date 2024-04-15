import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { Answer } from "../../enterprise/entities/answer"
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment"
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
    attachmentId: string[]
}

interface AnswerQuestionUseCaseResponse {
    answer: Answer
}

export class AnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRepository) { }
    async execute({ instructorId, questionId, content, attachmentId }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueID(instructorId),
            questionId: new UniqueID(questionId) 
        })

        const attachments = attachmentId.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueID(attachmentId),
                answerId: answer.id
            })
        })

        answer.attachments = new AnswerAttachmentList(attachments)


        await this.answersRepository.create(answer)

        return { answer }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })