import { AggregateRoot } from "./abstraction"

class ConcreteClass extends AggregateRoot<any> {
  public constructor(props: any) {
    super(props)
  }
}

describe("Aggregate Root abstraction tests", () => {
  it("should correctly instantiate parent abstract class (Entity)", () => {
    const props = {
      prop: "any_prop",
    }

    const result = new ConcreteClass(props)

    expect(result).toHaveProperty("props", props)
  })
})
