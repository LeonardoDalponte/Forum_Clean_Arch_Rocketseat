import { PaginationParams } from "../../../../core/repositories/pagination.params";
import { AnswerComment } from "../../enterprise/entities/answer-comments";

export interface CommentAnswerRepository {
    create(answer: AnswerComment): Promise<void>
    findById(answerid: string): Promise<AnswerComment>
    delete(answer: AnswerComment): Promise<void>
    findManyAnswerByid(answer: string, params : PaginationParams): Promise<AnswerComment[]>
}

