import { type Props } from "./value-object.protocol"
import { ValueObject } from "@/shared/abstractions/value-object"
import crypto from "crypto"

export class UUID extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  public static from(
    value: `${string}-${string}-${string}-${string}-${string}`,
  ): UUID {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (!uuidRegex.test(value)) {
      throw new Error("Invalid UUID string.")
    }

    return new UUID({ value })
  }

  public static random(): UUID {
    const uuid = crypto.randomUUID()
    return new UUID({ value: uuid })
  }

  public static restore(value: string): UUID {
    return new UUID({ value })
  }

  public toString(): string {
    return this.props.value
  }
}
