import { beforeEach, describe, expect, it, SpyInstance, vi } from "vitest"
import { makeAnswer } from "../../../../test/factories/make-answers"
import { makeQuestion } from "../../../../test/factories/make-question"
import { InMemoryAnswerRepository } from "../../../../test/repositories/in-memory-answer-repository"
import { InMemoryAnswerAttachmentRepository } from "../../../../test/repositories/in-memory-attachment-answer-repository"
import { InMemoryQuestionAttachmentRepository } from "../../../../test/repositories/in-memory-attachments-question-repository"
import { InMemoryNotificationRepository } from "../../../../test/repositories/in-memory-notification-repository"
import { InMemoryQuestionRepository } from "../../../../test/repositories/in-memory-question-repository"
import { waitFor } from "../../../../test/utils/wait-for"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "../use-cases/send-notification"
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen"


let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
    [SendNotificationUseCaseRequest],
    Promise<SendNotificationUseCaseResponse>
>

describe('On Question Best Answer Chosen', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentRepository()

        inMemoryQuestionsRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository)

        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentRepository()

        inMemoryAnswersRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentsRepository)

        inMemoryNotificationsRepository = new InMemoryNotificationRepository()

        sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository,)

        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

        new OnQuestionBestAnswerChosen(
            inMemoryAnswersRepository,
            sendNotificationUseCase,
        )
    })

    it('should send a notification when topic has new best answer chosen', async () => {
        const question = makeQuestion()
        const answer = makeAnswer({ questionId: question.id })

        inMemoryQuestionsRepository.create(question)
        inMemoryAnswersRepository.create(answer)

        question.bestAnswerId = answer.id

        inMemoryQuestionsRepository.save(question)

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toBeTruthy()
        })
    })
})