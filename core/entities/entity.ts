import { UniqueID } from "./unique-entity-id"

export abstract class Entity<Props> {
    private _id: UniqueID
    protected props: Props

    get id() {
        return this._id
    }

    protected constructor(props: Props, id?: UniqueID) {
        this.props = props
        this._id = id ?? new UniqueID(id)
    }

    public equals(entity: Entity<any>) {
        if (entity === this) {
            return true
        }

        if (entity.id === this._id) {
            return true
        }

        return false
    }

}