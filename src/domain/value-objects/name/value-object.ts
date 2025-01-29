import { ValueObject } from "@/shared/abstractions/value-object"
import { Props } from "./value-object.protocol"

export class Name extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  public static ofProject(value: string): Name {
    return new Name({ value: value.trim() })
  }

  public static ofDirectory(value: string) {
    return new Name({ value: value.trim() })
  }

  public toString() {
    return this.props.value
  }
}
