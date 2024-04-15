
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryNotificationRepository } from "../../../../test/repositories/in-memory-notification-repository";
import { SendNotificationUseCase } from "./send-notification";


let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe("Send notification", () => {

    beforeEach(() => {
        inMemoryNotificationRepository = new InMemoryNotificationRepository()
        sut = new SendNotificationUseCase(inMemoryNotificationRepository)

    })

    it("Should be able to send Notification", async () => {

        const { notification } = await sut.execute({

            recipientId: "!",
            title: "Nova pergunta",
            content: "Qual é meu nome?",
        
        
        })

        expect(notification.id).toBeTruthy()
        expect(inMemoryNotificationRepository.item[0].id).toEqual(notification.id)
      
    })

})