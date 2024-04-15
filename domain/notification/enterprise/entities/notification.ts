import { Entity } from "../../../../core/entities/entity"
import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { Optional } from "../../../../core/types/optional"

export interface NotificationProps {
    recipientId: UniqueID
    title: string
    content: string
    readAt?: Date
    createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
    attachments: any

    get title() {
        return this.props.title
    }

    get content() {
        return this.props.content
    }

    get readAt() {
        return this.props.readAt
    }

    get createdAt() {
        return this.props.createdAt
    }
    get recipientId() {
        return this.props.recipientId
    }

    read(){
        this.props.readAt = new Date()
    }

    static create(props: Optional<NotificationProps, "createdAt">, id?: UniqueID) {
        const notification = new Notification({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id)

        return notification
    }

}