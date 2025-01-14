import { faker } from '@faker-js/faker';
import { UniqueID } from "../../core/entities/unique-entity-id";
import { Question, QuestionProps } from "../../domain/forum/enterprise/entities/question";
import { Slug } from "../../domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueID) {
    const question = Question.create({
        authorId: new UniqueID(),
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        slug: Slug.create("example-answer"),
        ...override
    }, id)

    return question
}