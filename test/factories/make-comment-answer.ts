import { faker } from '@faker-js/faker';
import { UniqueID } from "../../core/entities/unique-entity-id";
import { Answer, AnswerProps } from "../../domain/forum/enterprise/entities/answer";
import { AnswerComment, AnswerCommentsProps } from '../../domain/forum/enterprise/entities/answer-comments';

export function makeCommentAnswer(override: Partial<AnswerCommentsProps> = {}, id?: UniqueID) {
    const answerComment = AnswerComment.create({
        authorId: new UniqueID(),
        answerId: new UniqueID(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return answerComment
}