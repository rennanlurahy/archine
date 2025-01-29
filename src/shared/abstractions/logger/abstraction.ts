export abstract class Logger {
  protected constructor() {}

  public abstract info(...message: string[]): void

  public abstract error(...message: string[]): void

  public abstract warn(...message: string[]): void
}
