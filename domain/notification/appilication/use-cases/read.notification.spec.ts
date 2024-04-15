
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryNotificationRepository } from "../../../../test/repositories/in-memory-notification-repository";
import { SendNotificationUseCase } from "./send-notification";
import { ReadNotificationUseCase } from "./read-notification";
import { makeNotification } from "../../../../test/factories/make-notification";


let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe("read notification", () => {

    beforeEach(() => {
        inMemoryNotificationRepository = new InMemoryNotificationRepository()
        sut = new ReadNotificationUseCase(inMemoryNotificationRepository)

    })

    it("Should be able to read Notification", async () => {

        const makeNotificationCreate = makeNotification()

        inMemoryNotificationRepository.create(makeNotificationCreate)

        const { notification } = await sut.execute({

            recipientId: makeNotificationCreate.recipientId.toString(),
            notificationId: makeNotificationCreate.id.toString()

        })

        expect(notification.id).toBeTruthy()
        expect(inMemoryNotificationRepository.item[0].readAt).toEqual(
            expect.any(Date)
        )

    })

})