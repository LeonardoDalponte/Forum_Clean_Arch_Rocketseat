import { Entity } from "../../../../core/entities/entity";
import { UniqueID } from "../../../../core/entities/unique-entity-id";

export interface QuestionAttachmentProps {
    questionId: UniqueID
    attachmentId: UniqueID
}


export class QuestionAttachment extends Entity<QuestionAttachmentProps> {

    get questionId() {
        return this.props.questionId
    }

    get attachmentId() {
        return this.props.attachmentId
    }

    static create(props: QuestionAttachmentProps, id?: UniqueID) {
        const attachment = new QuestionAttachment(props, id)

        return attachment
    }
}

