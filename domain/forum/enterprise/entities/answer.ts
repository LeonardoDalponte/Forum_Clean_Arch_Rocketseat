import { AggregateRoot } from "../../../../core/entities/aggregate.root"
import { Entity } from "../../../../core/entities/entity"
import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { Optional } from "../../../../core/types/optional"
import { AnswerAttachmentList } from "./answer-attachment-list"
import { AnswerCreatedEvent } from "./events/answer-created-event"

export interface AnswerProps {
    content: string
    questionId: UniqueID
    authorId: UniqueID
    attachments: AnswerAttachmentList
    createdAt: Date
    updateAt?: Date
}

export class Answer extends AggregateRoot<AnswerProps> {

    get content() {
        return this.props.content
    }

    get answerId() {
        return this.props.questionId
    }

    get authorId() {
        return this.props.authorId
    }

    get attachments() {
        return this.props.attachments
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updateAt() {
        return this.props.updateAt
    }

    get excerpt() {
        return this.content
            .trimEnd()
            .substring(0, 120)
            .concat('...    ')
    }

    get questionId() {
        return this.props.questionId
    }

    //!_____________________________________________SETTERS_______________________________________


    private touch() {
        return this.props.updateAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }


    set attachments(attachments: AnswerAttachmentList) {
        this.props.attachments = attachments
        this.touch()
    }



    static create(
        props: Optional<AnswerProps, "createdAt" | "attachments">,
        id?: UniqueID) {

        const answer = new Answer({
            ...props,
            attachments: props.attachments ?? new AnswerAttachmentList(),
            createdAt: new Date()
        }, id)

        const isNewAnswer = !id

        if (isNewAnswer) {
            answer.addDomainEvent(new AnswerCreatedEvent(answer))
        }

        return answer
    }
}
