export abstract class UseCase<I extends any[], O> {
  protected constructor() {}

  abstract execute(...args: I): O
}
