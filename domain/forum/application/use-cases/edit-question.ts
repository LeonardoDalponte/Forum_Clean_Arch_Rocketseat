import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { InMemoryQuestionAttachmentRepository } from "../../../../test/repositories/in-memory-attachments-question-repository"
import { Question } from "../../enterprise/entities/question"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"
import { QuestionAttachmentRepository } from "../repositories/question-attachment-repository"
import { QuestionRepository } from "../repositories/question-repository"
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list"


interface EditQuestionUserCaseRequest {
    questionId: string
    title: string
    content: string
    authorId: string
    attachmentsid: string[]
}

interface EditQuestionUserCaseResponse {
    question: Question
}

export class EditQuestionUseCase {
    constructor(private questionRepository: QuestionRepository, private questionAttachmentRepository: InMemoryQuestionAttachmentRepository) { }
    async execute({ questionId, authorId, content, title, attachmentsid }: EditQuestionUserCaseRequest): Promise<EditQuestionUserCaseResponse> {

        const question = await this.questionRepository.findByid(questionId)

        if (!question) {
            throw new Error("nada encontardo")
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error("Not Allowed")
        }

        const currentAttachmentQuestions = await this.questionAttachmentRepository.findManyByQuestionId(questionId)
        const attachmentsQuestionList = new QuestionAttachmentList(currentAttachmentQuestions)


        const questionAttachments = attachmentsid.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueID(attachmentId),
                questionId: question.id
            })
        })

        attachmentsQuestionList.update(questionAttachments)

        question.title = title
        question.content = content
        question.attachments = attachmentsQuestionList

        await this.questionRepository.save(question)

        return {
            question,
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })