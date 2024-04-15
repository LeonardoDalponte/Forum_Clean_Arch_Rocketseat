import { NotificationRepository } from "../../domain/notification/appilication/repositories/notification-repository";
import { Notification } from "../../domain/notification/enterprise/entities/notification";

export class InMemoryNotificationRepository implements NotificationRepository {

    public item: Notification[] = []

    async findById(id: string) {
        const notification = this.item.find((item) => item.id.toString() === id)

        if (!notification) {
            throw new Error("erro")
        }
        return notification
    }


    async create(notification: Notification) {
        this.item.push(notification)
    }

    async save(notification: Notification) {
        const itemIndex = this.item.findIndex((item) => item.id === notification.id)
        this.item[itemIndex] = notification
    }



}

