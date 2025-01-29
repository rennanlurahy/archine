import { Entity } from "@/shared/abstractions/entity"
import { type UUID } from "@/domain/value-objects/uuid"

export abstract class AggregateRoot<
  Props extends { [key: string]: any; id: UUID },
> extends Entity<Props> {
  protected constructor(props: Props) {
    super(props)
  }
}
