import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { Question } from "../../enterprise/entities/question"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"
import { QuestionRepository } from "../repositories/question-repository"
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list"

interface CreateQuestionUseCaseRequest {
    authorId: string
    title: string
    content: string
    attachmentsid: string[]
}

interface CreateQuestionUseCaseResponse {
    question: Question
}

export class CreateQuestionUseCase {
    constructor(private questionRepository: QuestionRepository) { }
    async execute({ title, authorId, content, attachmentsid }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueID(authorId),
            content,
            title,
        })

        const attachments = attachmentsid.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueID(attachmentId),
                questionId: question.id
            })
        })

        question.attachments = new QuestionAttachmentList(attachments)

        await this.questionRepository.create(question)

        return {
            question,
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })