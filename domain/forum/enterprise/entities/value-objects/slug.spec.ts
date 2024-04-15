import { expect, test } from "vitest";
import { Slug } from "./slug";


test("it should be able to  create a new slug form text", () => {

    const slug = Slug.createFromText("Example answer title")

    expect(slug.value).toEqual("example-answer-title")
})