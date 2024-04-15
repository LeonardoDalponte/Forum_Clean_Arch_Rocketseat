import { faker } from '@faker-js/faker';
import { UniqueID } from "../../core/entities/unique-entity-id";
import { Answer, AnswerProps } from "../../domain/forum/enterprise/entities/answer";

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueID) {
    const answer = Answer.create({
        authorId: new UniqueID(),
        questionId: new UniqueID(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return answer
}