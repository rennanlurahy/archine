import { type UUID } from "@/domain/value-objects/uuid"

export abstract class Entity<Props extends { [key: string]: any; id: UUID }> {
  protected readonly props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public get id(): UUID {
    return this.props.id
  }

  public isEqualTo(other: Entity<Props>): boolean {
    const result = false

    if (
      other.constructor.name === this.constructor.name &&
      this.props.id.isEqualTo(other.props.id)
    ) {
      return true
    }

    return result
  }
}
