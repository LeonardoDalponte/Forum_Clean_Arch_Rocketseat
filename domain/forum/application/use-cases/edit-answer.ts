import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { InMemoryAnswerAttachmentRepository } from "../../../../test/repositories/in-memory-attachment-answer-repository"
import { Answer } from "../../enterprise/entities/answer"
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment"
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list"
import { AnswersRepository } from "../repositories/answers-repository"


interface EditAnswerUserCaseRequest {
    answerId: string
    content: string
    authorId: string
    attachmentid: string[]
}

interface EditAnswerUserCaseResponse {
    answer: Answer
}

export class EditAnswerUseCase {
    constructor(private answerRepository: AnswersRepository, private AnswerAttachmentRepository: InMemoryAnswerAttachmentRepository) { }
    async execute({ answerId, authorId, content, attachmentid }: EditAnswerUserCaseRequest): Promise<EditAnswerUserCaseResponse> {

        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error("nada encontardo")
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error("Not Allowed")
        }

        const currentAnswerAttachment = await this.AnswerAttachmentRepository.findManyByAnswerId(answerId)
        const attachmentsQuestionList = new AnswerAttachmentList(currentAnswerAttachment)


        const answerAttachments = attachmentid.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueID(attachmentId),
                answerId: answer.id
            })
        })

        attachmentsQuestionList.update(answerAttachments)

        
        answer.attachments = attachmentsQuestionList
        answer.content = content

        await this.answerRepository.save(answer)

        return {
            answer,
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })