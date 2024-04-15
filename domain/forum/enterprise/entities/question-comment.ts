import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { Optional } from "../../../../core/types/optional"
import { Comment, CommentProps } from "./comment"

export interface QuestionCommentsProps extends CommentProps {
    questionId: UniqueID
}


export class QuestionComment extends Comment<QuestionCommentsProps> {

    get questionId() {
        return this.props.questionId
    }

    static create(
        props: Optional<QuestionCommentsProps, "createdAt">,
        id?: UniqueID) {

        const questionComment = new QuestionComment({
            ...props,
            createdAt: new Date()
        }, id)

        return questionComment
    }
}
