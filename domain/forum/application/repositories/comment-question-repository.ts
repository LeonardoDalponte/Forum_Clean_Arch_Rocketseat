import { PaginationParams } from "../../../../core/repositories/pagination.params";
import { QuestionComment } from "../../enterprise/entities/question-comment";


export interface CommentQuestionRepository {
    create(question: QuestionComment): Promise<void>
    findById(questionid: string): Promise<QuestionComment>
    delete(questionId: QuestionComment): Promise<void>
    findManyQuestionByid(questionId: string, params: PaginationParams): Promise<QuestionComment[]>
}