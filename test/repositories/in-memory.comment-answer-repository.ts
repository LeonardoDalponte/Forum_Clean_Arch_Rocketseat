
import { PaginationParams } from "../../core/repositories/pagination.params";
import { CommentAnswerRepository } from "../../domain/forum/application/repositories/comment-answer-repository";
import { AnswerComment } from "../../domain/forum/enterprise/entities/answer-comments";

export class InMemoryCommentAnswerRepository implements CommentAnswerRepository {
    public items: AnswerComment[] = []
    async findManyAnswerByid(answerid: string, { page }: PaginationParams) {

        const answerComments = this.items.filter((item) => item.answerid.toString() === answerid)
            .slice((page - 1) * 20, page * 20)

        return answerComments
    }


    async findManyQuestionByid(answerid: string, { page }: PaginationParams) {
        const answersComments = this.items.filter((item) => item.answerid.toString() === answerid)
            .slice((- 1) * 20, page * 20)

        return answersComments
    }



    async create(commentAnswer: AnswerComment) {
        this.items.push(commentAnswer)
    }


    async findById(answerId: string) {
        const answer = this.items.find((item) => item.id.toString() === answerId)

        if (!answer) {
            throw new Error("Erro na busca!")
        }

        return answer
    }

    async delete(answerComment: AnswerComment) {
        const itemIndex = this.items.findIndex((item) => item.id === answerComment.id)
        this.items.splice(itemIndex, 1)
    }


}