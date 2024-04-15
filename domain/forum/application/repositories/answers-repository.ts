import { PaginationParams } from "../../../../core/repositories/pagination.params"
import { Answer } from "../../enterprise/entities/answer"

export interface AnswersRepository {
    create(answer: Answer): Promise<void>
    findById(id: string): Promise<Answer | null>
    delete(anwer: Answer): Promise<void>
    save(answer: Answer): Promise<void>
    findManyByQuestionId(qustion: string, params: PaginationParams): Promise<Answer[]>
}