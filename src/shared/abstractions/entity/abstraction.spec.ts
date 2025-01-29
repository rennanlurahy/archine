import { Entity } from "./abstraction"

class FirstConcreteClass extends Entity<any> {
  public constructor(props: any) {
    super(props)
  }
}

class SecondConcreteClass extends Entity<any> {
  public constructor(props: any) {
    super(props)
  }
}

class FakeUUID {
  public isEqualTo(): boolean {
    return true
  }
}

describe("Entity abstraction tests", () => {
  const fakeUUID = new FakeUUID()

  it("should return true when different instances of equals Entities are compared", () => {
    const entity1 = new FirstConcreteClass({ id: fakeUUID })
    const entity2 = new FirstConcreteClass({ id: fakeUUID })

    const result = entity1.isEqualTo(entity2)

    expect(result).toBe(true)
  })

  it("should return false when different instances of two entities with different ids are compared", () => {
    const mock = jest
      .spyOn(fakeUUID, "isEqualTo")
      .mockImplementation(() => false)

    const entity1 = new FirstConcreteClass({ id: fakeUUID })
    const entity2 = new FirstConcreteClass({ id: fakeUUID })

    const result = entity1.isEqualTo(entity2)

    expect(result).toBe(false)

    mock.mockRestore()
  })

  it("should return false when different instances of two entities with different constructor names are compared", () => {
    const entity1 = new FirstConcreteClass({ id: fakeUUID })
    const entity2 = new SecondConcreteClass({ id: fakeUUID })

    const result = entity1.isEqualTo(entity2)

    expect(result).toBe(false)
  })
})
