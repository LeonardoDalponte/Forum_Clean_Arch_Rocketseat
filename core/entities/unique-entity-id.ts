import { randomUUID } from "crypto";

export class UniqueID {

    private value: string

    toString() {
        return this.value;
    }

    ToValue() {
        return this.value
    }

    constructor(value?: string) {
        this.value = value ?? randomUUID()
    }   

    public equals(id: UniqueID) {
        return id.ToValue() === this.value
      }
}