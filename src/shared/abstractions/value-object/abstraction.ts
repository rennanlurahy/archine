export abstract class ValueObject<Props extends Record<string, any>> {
  protected readonly props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public isEqualTo(other: ValueObject<Props>): boolean {
    let result = false

    if (other.constructor.name === this.constructor.name) {
      for (const key of Object.keys(this.props)) {
        if (
          this.props[key] instanceof Date &&
          this.props[key].getTime() === other.props[key].getTime()
        ) {
          result = true
        } else if (this.props[key] === other.props[key]) {
          result = true
        } else {
          result = false
          break
        }
      }
    }

    return result
  }

  public clone(props?: Partial<Props>): this {
    const instance = Reflect.getPrototypeOf(this) as object

    const clonedProps = this.deepClone(this.props)

    if (props != null) {
      Object.keys(props).forEach((key) => {
        if (key in clonedProps) {
          clonedProps[key] = props[key]
        }
      })
    }

    return Reflect.construct(instance.constructor, [clonedProps])
  }

  private deepClone(props: Record<string, any>): Record<string, any> {
    const container: Record<string, any> = {}

    for (const [propKey, propValue] of Object.entries(props)) {
      if (propValue instanceof Date) {
        container[propKey] = new Date(propValue)
      } else if (propValue?.clone != null) {
        container[propKey] = propValue.clone()
      } else if (propValue != null && typeof propValue === "object") {
        container[propKey] = this.deepClone(propValue)
      } else {
        container[propKey] = propValue
      }
    }

    return container
  }
}
