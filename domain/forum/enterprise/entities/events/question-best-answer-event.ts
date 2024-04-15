import { UniqueID } from "../../../../../core/entities/unique-entity-id"
import { DomainEvent } from "../../../../../core/events/domain-event"
import { Question } from "../question"


export class QuestionBestAnswerChoseEvent implements DomainEvent {
    public ocurredAt: Date
    public question: Question
    public bestAnswerId: UniqueID

    constructor(question: Question, bestAnswerId: UniqueID) {
        this.bestAnswerId = bestAnswerId
        this.question = question
        this.ocurredAt = new Date()
    }

    getAggregateId(): UniqueID {
        return this.question.id
    }
}