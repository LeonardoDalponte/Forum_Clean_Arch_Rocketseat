
import { QuestionAttachmentRepository } from "../../domain/forum/application/repositories/question-attachment-repository";
import { QuestionAttachment } from "../../domain/forum/enterprise/entities/question-attachment";
import { QuestionComment } from "../../domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionAttachmentRepository implements QuestionAttachmentRepository {

    public items: QuestionAttachment[] = []
    async findManyByQuestionId(questionId: string) {
        const questioncomments = this.items.filter((item) => item.questionId.toString() === questionId)

        return questioncomments
    }

}



