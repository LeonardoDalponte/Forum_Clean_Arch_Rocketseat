export class Slug {

    value: string

    private constructor(value: string) { this.value = value }

    static create(slug: string) {
        return new Slug(slug)
    }



    static createFromText(value: string) {
        const slugText = value
            .normalize("NFKD") //!tira acentuacao
            .toLowerCase()
            .trim() //!tira espacamento
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/g, '')

        return new Slug(slugText)
    }
}

