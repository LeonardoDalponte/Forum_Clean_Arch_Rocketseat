import { faker } from '@faker-js/faker';
import { UniqueID } from "../../core/entities/unique-entity-id";
import { QuestionComment, QuestionCommentsProps } from '../../domain/forum/enterprise/entities/question-comment';

export function makeQuestionComment(
    override: Partial<QuestionCommentsProps> = {},
    id?: UniqueID,
) {
    const question = QuestionComment.create(
        {
            authorId: new UniqueID(),
            questionId: new UniqueID(),
            content: faker.lorem.text(),
            ...override,
        },
        id,
    )

    return question
}