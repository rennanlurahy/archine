import { Logger } from "@/shared/abstractions/logger/abstraction"

export class ConsoleLogger extends Logger {
  public constructor() {
    super()
  }

  public error(...message: string[]) {
    console.error("[ERROR]: ", ...message)
  }

  public info(...message: string[]) {
    console.log("[INFO]: ", ...message)
  }

  public warn(...message: string[]) {
    console.log("[INFO]: ", ...message)
  }
}
