import { DomainEvents } from "../../core/events/domain-events";
import { PaginationParams } from "../../core/repositories/pagination.params";
import { AnswersRepository } from "../../domain/forum/application/repositories/answers-repository";
import { Answer } from "../../domain/forum/enterprise/entities/answer";
import { InMemoryAnswerAttachmentRepository } from "./in-memory-attachment-answer-repository";

export class InMemoryAnswerRepository implements AnswersRepository {
    constructor(private isMemoryAnswerAttachmentRepository:InMemoryAnswerAttachmentRepository){}
    items: Answer[] = []
    async findManyByQuestionId(question: string, { page }: PaginationParams) {
        const answers = this.items.filter((item) => item.questionId.toString() === question)
            .slice((page - 1) * 20, page * 20)

        return answers
    }

    async findManyByAQuestionId(questionId: string, { page }: PaginationParams) {

    }

    async save(answer: Answer) {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)

        this.items[itemIndex] = answer

        DomainEvents.dispatchEventsForAggregate(answer.id)
    }


    async findById(id: string): Promise<Answer | null> {
        const answer = this.items.find((item) => item.id.toString() === id)

        if (!answer) {
            throw new Error("erro")
        }
        return answer
    }

    async delete(question: Answer): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id === question.id)
        this.items.splice(itemIndex, 1)
    }



    async create(answer: Answer) {
        this.items.push(answer)

        DomainEvents.dispatchEventsForAggregate(answer.id)
    }
}