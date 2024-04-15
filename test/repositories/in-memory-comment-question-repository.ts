
import { PaginationParams } from "../../core/repositories/pagination.params";
import { CommentQuestionRepository } from "../../domain/forum/application/repositories/comment-question-repository";
import { QuestionComment } from "../../domain/forum/enterprise/entities/question-comment";

export class InMemoryCommentQuestionRepository implements CommentQuestionRepository {
   async findManyQuestionByid(questionId: string, {page}: PaginationParams) {
        const questionComments = this.items.filter((item) => item.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20)

        return questionComments
    }
    public items: QuestionComment[] = []

    async findById(questionid: string) {
        const question = this.items.find((item) => item.id.toString() === questionid)

        if (!question) {
            throw new Error("Erro na busca!")
        }

        return question
    }

    async delete(questionComment: QuestionComment) {
        const itemIndex = this.items.findIndex((item) => item.id === questionComment.id)
        this.items.splice(itemIndex, 1)
    }



    async create(commentquestion: QuestionComment) {
        this.items.push(commentquestion)
    }


}