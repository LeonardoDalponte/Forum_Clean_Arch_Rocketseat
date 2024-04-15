import { DomainEvents } from "../../core/events/domain-events";
import { PaginationParams } from "../../core/repositories/pagination.params";
import { QuestionRepository } from "../../domain/forum/application/repositories/question-repository";
import { Question } from "../../domain/forum/enterprise/entities/question";
import { InMemoryQuestionAttachmentRepository } from "./in-memory-attachments-question-repository";

export class InMemoryQuestionRepository implements QuestionRepository {
    constructor(private inMemoryQuestionAttachmentsRepository:InMemoryQuestionAttachmentRepository){}

    public items: Question[] = []
    async findManyRecent({ page }: PaginationParams) {
        const questions = this.items
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * 20, page * 20)

        return questions
    }


    async findByid(id: string): Promise<Question | null> {
        const question = this.items.find((item) => item.id.toString() === id)

        if (!question) {
            throw new Error("erro")
        }
        return question
    }


    async FindBySlug(slug: string) {
        const question = this.items.find(item => item.slug.value === slug)

        if (!question) {
            throw new Error("Slug não encontrado")
        }

        return question
    }


    async create(question: Question) {
        this.items.push(question)

        DomainEvents.dispatchEventsForAggregate(question.id)
    }

    async save(question: Question) {
        const itemIndex = this.items.findIndex((item) => item.id === question.id)
        this.items[itemIndex] = question

        DomainEvents.dispatchEventsForAggregate(question.id)
    }


    async delete(question: Question): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id === question.id)
        this.items.splice(itemIndex, 1)
    }

}