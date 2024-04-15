

import { AnswerAttachmentRepository } from "../../domain/forum/application/repositories/answer-attachment-repository";
import { AnswerAttachment } from "../../domain/forum/enterprise/entities/answer-attachment";

export class InMemoryAnswerAttachmentRepository implements AnswerAttachmentRepository {
    public items: AnswerAttachment[] = []
    async findManyByAnswerId(answerId: string) {
        const questioncomments = this.items.filter((item) => item.answerId.toString() === answerId)

        return questioncomments
    }
}




