import dayjs from 'dayjs'
import { AggregateRoot } from '../../../../core/entities/aggregate.root'
import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { Optional } from "../../../../core/types/optional"
import { QuestionAttachmentList } from './question-attachment-list'
import { Slug } from "./value-objects/slug"
import { QuestionBestAnswerChoseEvent } from './events/question-best-answer-event'

export interface QuestionProps {
    title: string
    bestAnswerId?: UniqueID
    authorId: UniqueID
    attachments: QuestionAttachmentList
    content: string
    slug: Slug
    createdAt: Date
    updateAt?: Date
}


export class Question extends AggregateRoot<QuestionProps> {


    get title() {
        return this.props.title
    }

    get bestAnswerId() {
        return this.props.bestAnswerId
    }

    get authorId() {
        return this.props.authorId
    }


    get content() {
        return this.props.content
    }

    get slug() {
        return this.props.slug
    }


    get createdAt() {
        return this.props.createdAt
    }


    get updateAt() {
        return this.props.updateAt
    }

    get isNew(): boolean {
        return dayjs().diff(this.createdAt, "days") <= 3
    }


    get excerpt() {
        return this.content
            .trimEnd()
            .substring(0, 120)
            .concat('...    ')
    }

    get attachments() {
        return this.props.attachments
    }

    //!_____________________________________________SETTERS_______________________________________

    private touch() {
        return this.props.updateAt = new Date()
    }

    set title(title: string) {
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    set bestAnswerId(bestAnswerId: UniqueID | undefined) {
        this.props.bestAnswerId = bestAnswerId

        if (bestAnswerId === undefined) {
            return
        }

        if (this.props.bestAnswerId === undefined || !bestAnswerId.equals(this.props.bestAnswerId)) {
            this.addDomainEvent(new QuestionBestAnswerChoseEvent(this, bestAnswerId))
        }

        this.props.bestAnswerId = bestAnswerId



        this.touch()
    }

    set attachments(attachments: QuestionAttachmentList) {
        this.props.attachments = attachments
        this.touch()
    }


    static create(
        props: Optional<QuestionProps, "createdAt" | "slug" | "attachments">,
        id?: UniqueID) {

        const answer = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            attachments: props.attachments ?? new QuestionAttachmentList(),
            createdAt: props.createdAt ?? new Date()
        }, id)

        return answer
    }

}