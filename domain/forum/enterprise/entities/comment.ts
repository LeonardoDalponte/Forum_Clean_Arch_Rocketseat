import { Entity } from "../../../../core/entities/entity"
import { UniqueID } from "../../../../core/entities/unique-entity-id"

export interface CommentProps {
    authorId: UniqueID
    content: string
    createdAt: Date
    updateAt?: Date
}

export abstract class Comment<Props extends CommentProps> extends Entity<Props> {

    //* Proxima entidade que herdar Comment podera informa mais campos propios na interface, pois o generic mostra 
    //*sua interface ira extender dessa inteface(CommentProps)


    get content() {
        return this.props.content
    }

    get authorId() {
        return this.props.authorId
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


    //!_____________________________________________SETTERS_______________________________________


    private touch() {
        return this.props.updateAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }


    // static create(
    //     props: Optional<CommentProps, "createdAt">,
    //     id?: UniqueID) {

    //     const comment = new Comment({
    //         ...props,
    //         createdAt: new Date()
    //     }, id)

    //     return comment
    // }
}
