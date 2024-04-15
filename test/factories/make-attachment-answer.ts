import { UniqueID } from "../../core/entities/unique-entity-id";
import { AnswerAttachment, AnswerAttachmentProps } from "../../domain/forum/enterprise/entities/answer-attachment";


export function makeAnswerAttachment(
    override: Partial<AnswerAttachmentProps> = {},
    id?: UniqueID,
) {
    const answerattachment = AnswerAttachment.create(
        {
            answerId: new UniqueID(),
            attachmentId: new UniqueID(),
            ...override,
        },
        id,
    )

    return answerattachment
}