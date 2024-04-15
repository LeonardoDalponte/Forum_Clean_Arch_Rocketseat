import { Entity } from "../../../../core/entities/entity";
import { UniqueID } from "../../../../core/entities/unique-entity-id";

export interface AnswerAttachmentProps {
    answerId: UniqueID
    attachmentId: UniqueID
}


export class AnswerAttachment extends Entity<AnswerAttachmentProps> {

    get answerId() {
        return this.props.answerId
    }

    get attachmentId() {
        return this.props.attachmentId
    }

    static create(props: AnswerAttachmentProps, id?: UniqueID) {
        const attachment = new AnswerAttachment(props, id)

        return attachment
    }
}