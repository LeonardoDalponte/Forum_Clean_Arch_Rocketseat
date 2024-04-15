import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { Optional } from "../../../../core/types/optional"
import { Comment, CommentProps } from "./comment"

export interface AnswerCommentsProps extends CommentProps {
    answerId: UniqueID
}

export class AnswerComment extends Comment<AnswerCommentsProps> {

    get answerid() {
        return this.props.answerId
    }

    static create(
        props: Optional<AnswerCommentsProps, "createdAt">,
        id?: UniqueID) {

        const answerComment = new AnswerComment({
            ...props,
            createdAt: new Date()
        }, id)

        return answerComment
    }
}
