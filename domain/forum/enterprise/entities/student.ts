
import { Entity } from "../../../../core/entities/entity"
import { UniqueID } from "../../../../core/entities/unique-entity-id"


interface StudentProps {
    name: string
}

export class Student extends Entity<StudentProps> {
    static create(props: StudentProps, id?: UniqueID) {

        const student = new Student(props, id)

        return student
    }

} 