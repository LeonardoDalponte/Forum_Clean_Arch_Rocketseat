import { UniqueID } from "../../../../core/entities/unique-entity-id"
import { InMemoryNotificationRepository } from "../../../../test/repositories/in-memory-notification-repository"
import { Notification } from "../../enterprise/entities/notification"
import { NotificationRepository } from "../repositories/notification-repository"



interface ReadNotificationUseCaseRequest {
    notificationId: string
    recipientId: string
}

interface ReadNotificationUseCaseResponse {
    notification: Notification
}

export class ReadNotificationUseCase {
    constructor(private notificationRepository: InMemoryNotificationRepository) { }
    async execute({ recipientId, notificationId }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {

        const notification = await this.notificationRepository.findById(notificationId)

        if (!notification) {
            throw new Error("nada encontardo")
        }

        if (recipientId !== notification.recipientId.toString()) {
            throw new Error("Not Allowed")
        }

        notification.read()
        await this.notificationRepository.save(notification)

        return {
            notification,
        }
    }
}
// new AnwerAnswerUseCase().execute({ instructorId: "1", answerId: '2' })