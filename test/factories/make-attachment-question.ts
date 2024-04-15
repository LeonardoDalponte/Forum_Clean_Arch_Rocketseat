import { faker } from '@faker-js/faker';
import { UniqueID } from "../../core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from '../../domain/forum/enterprise/entities/question-attachment';

export function makeQuestionAttachment(
    override: Partial<QuestionAttachmentProps> = {},
    id?: UniqueID,
) {
    const questionattachment = QuestionAttachment.create(
        {

            questionId: new UniqueID(),
            attachmentId: new UniqueID(),
            ...override,
        },
        id,
    )

    return questionattachment
}