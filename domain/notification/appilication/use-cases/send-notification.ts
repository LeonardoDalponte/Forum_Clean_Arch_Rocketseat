import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { InMemoryNotificationRepository } from "../../../../test/repositories/in-memory-notification-repository"
import { Notification } from "../../enterprise/entities/notification"



export interface SendNotificationUseCaseRequest {
    recipientId: string
    title: string
    content: string
  
}

export interface SendNotificationUseCaseResponse {
    notification: Notification
}

export class SendNotificationUseCase {
    constructor(private notificationRepository:InMemoryNotificationRepository ) { }
    async execute({ title, recipientId, content }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {

        const notification = Notification.create({
            content,
            title,
            recipientId: new UniqueID(recipientId)
        })


        await this.notificationRepository.create(notification)

        return {
            notification,
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })