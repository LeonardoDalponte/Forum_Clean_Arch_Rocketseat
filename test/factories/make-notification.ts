import { faker } from '@faker-js/faker';
import { UniqueID } from "../../core/entities/unique-entity-id";

import { Slug } from "../../domain/forum/enterprise/entities/value-objects/slug";
import { Notification, NotificationProps } from '../../domain/notification/enterprise/entities/notification';

export function makeNotification(override: Partial<NotificationProps> = {}, id?: UniqueID) {
    const notification = Notification.create({
        recipientId: new UniqueID(),
        title: faker.lorem.sentence(4),
        content: faker.lorem.sentence(),
        ...override
    }, id)

    return notification
}