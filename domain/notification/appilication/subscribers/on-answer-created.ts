import { DomainEvents } from "../../../../core/events/domain-events"
import { EventHandler } from "../../../../core/events/event-handler"
import { QuestionRepository } from "../../../forum/application/repositories/question-repository"
import { AnswerCreatedEvent } from "../../../forum/enterprise/entities/events/answer-created-event"
import { SendNotificationUseCase } from "../use-cases/send-notification"

export class OnAnswerCreated implements EventHandler {
    constructor(
        private questionsRepository: QuestionRepository,
        private sendNotification: SendNotificationUseCase,
    ) {
        this.setupSubscriptions()
    }


    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewAnswerNotification.bind(this),
            AnswerCreatedEvent.name,
        )
    }

    private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
        console.log(answer)
        const question = await this.questionsRepository.findByid(
            answer.questionId.toString(),
        )

        if (question) {
            await this.sendNotification.execute({
                recipientId: question.authorId.toString(),
                title: `Nova resposta em "${question.title
                    .substring(0, 40)
                    .concat('...')}"`,
                content: answer.excerpt,
            })
        }
    }

}