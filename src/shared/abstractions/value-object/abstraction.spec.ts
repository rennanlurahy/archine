import { ValueObject } from "./abstraction"

class FirstConcreteClass extends ValueObject<Record<any, any>> {
  public constructor(props: Record<any, any>) {
    super(props)
  }

  get attr(): any {
    return this.props
  }
}

class SecondConcreteClass extends ValueObject<Record<any, any>> {
  public constructor(props: Record<any, any>) {
    super(props)
  }

  get attr(): any {
    return this.props
  }
}

describe("Value Object abstraction tests", () => {
  it("should return true when different instances of equals Value objects are compared", () => {
    const vo1 = new FirstConcreteClass({
      key1: "any_string",
      key2: 0,
      key3: false,
      key4: new Date(2024, 6, 15),
    })
    const vo2 = new FirstConcreteClass({
      key1: "any_string",
      key2: 0,
      key3: false,
      key4: new Date(2024, 6, 15),
    })

    const result = vo1.isEqualTo(vo2)

    expect(result).toBe(true)
  })

  it("should return false when different instances of two value objects with different props are compared", () => {
    let vo1 = new FirstConcreteClass({
      key1: "any_string_1",
      key2: 0,
      key3: false,
      key4: new Date(2024, 6, 15),
    })
    let vo2 = new FirstConcreteClass({
      key1: "any_string_2",
      key2: 0,
      key3: false,
      key4: new Date(2024, 6, 15),
    })

    let result = vo1.isEqualTo(vo2)

    expect(result).toBe(false)

    vo1 = new FirstConcreteClass({
      key1: "any_string",
      key2: 1,
      key3: false,
      key4: new Date(2024, 6, 15),
    })
    vo2 = new FirstConcreteClass({
      key1: "any_string",
      key2: 2,
      key3: false,
      key4: new Date(2024, 6, 15),
    })

    result = vo1.isEqualTo(vo2)

    expect(result).toBe(false)

    vo1 = new FirstConcreteClass({
      key1: "any_string",
      key2: 0,
      key3: true,
      key4: new Date(2024, 6, 15),
    })
    vo2 = new FirstConcreteClass({
      key1: "any_string",
      key2: 0,
      key3: false,
      key4: new Date(2024, 6, 15),
    })

    result = vo1.isEqualTo(vo2)

    expect(result).toBe(false)

    vo1 = new FirstConcreteClass({
      key1: "any_string",
      key2: 0,
      key3: false,
      key4: new Date(2024, 6, 16),
    })
    vo2 = new FirstConcreteClass({
      key1: "any_string",
      key2: 0,
      key3: false,
      key4: new Date(2024, 6, 15),
    })

    result = vo1.isEqualTo(vo2)

    expect(result).toBe(false)
  })

  it("should return false when different instances of two value objects with different constructor names are compared", () => {
    const vo1 = new FirstConcreteClass({
      key1: "any_string",
      key2: 0,
      key3: false,
      key4: new Date(),
    })
    const vo2 = new SecondConcreteClass({
      key1: "any_string",
      key2: 0,
      key3: false,
      key4: new Date(2024, 6, 15),
    })

    const result = vo1.isEqualTo(vo2)

    expect(result).toBe(false)
  })

  it("should clone a value object", () => {
    const props = {
      key1: "any_string",
      key2: 0,
      key3: false,
      key4: new Date(),
      key5: { key1: "any_string", key2: 0, key3: false, key4: new Date() },
      key6: new SecondConcreteClass({
        key1: "any_string",
        key2: 0,
        key3: false,
        key4: new Date(2024, 6, 15),
      }),
    }
    const vo = new FirstConcreteClass(props)

    const result = vo.clone()

    expect(result).not.toBe(vo)
    expect(result).toStrictEqual(vo)
    expect(result.attr.key4).not.toBe(props.key4)
    expect(result.attr.key5).not.toBe(props.key5)
    expect(result.attr.key5.key4).not.toBe(props.key5.key4)
    expect(result.attr.key6).not.toBe(props.key6)
    expect(result.attr.key6.attr.key4).not.toBe(props.key6.attr.key4)
  })
})
