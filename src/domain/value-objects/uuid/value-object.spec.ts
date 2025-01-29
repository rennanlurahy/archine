import { UUID } from "./value-object"
import crypto from "crypto"

jest
  .spyOn(crypto, "randomUUID")
  .mockReturnValueOnce("550e8400-e29b-41d4-a716-446655440000")
  .mockReturnValueOnce("123e4567-e89b-12d3-a456-426614174000")
  .mockReturnValueOnce("f47ac10b-58cc-4372-a567-0e02b2c3d479")

describe("UUID Value Object tests", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should create a random UUID", () => {
    let result = UUID.random()

    expect(result).toBeInstanceOf(UUID)
    expect(result).toEqual({
      props: { value: "550e8400-e29b-41d4-a716-446655440000" },
    })

    result = UUID.random()

    expect(result).toBeInstanceOf(UUID)
    expect(result).toEqual({
      props: { value: "123e4567-e89b-12d3-a456-426614174000" },
    })
  })

  it("should create a UUID from an string", () => {
    let result = UUID.from("550e8400-e29b-41d4-a716-446655440000")

    expect(result).toBeInstanceOf(UUID)
    expect(result).toEqual({
      props: { value: "550e8400-e29b-41d4-a716-446655440000" },
    })

    result = UUID.from("123e4567-e89b-12d3-a456-426614174000")

    expect(result).toBeInstanceOf(UUID)
    expect(result).toEqual({
      props: { value: "123e4567-e89b-12d3-a456-426614174000" },
    })
  })

  it("should restore a UUID", () => {
    const uuid = "any_uuid"

    const result = UUID.restore(uuid)

    expect(result).toBeInstanceOf(UUID)
    expect(result).toEqual({ props: { value: uuid } })
  })

  it("should throw an error when trying to create an UUID from an invalid string", () => {
    const result = (): UUID => UUID.from("any_uuid" as any)

    expect(result).toThrow("Invalid UUID string.")
  })

  it("should transform a UUID into a string", () => {
    const uuid = UUID.random()

    const result = uuid.toString()

    expect(result).toBe("f47ac10b-58cc-4372-a567-0e02b2c3d479")
  })
})
