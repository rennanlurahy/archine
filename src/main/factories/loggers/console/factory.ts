import { ConsoleLogger } from "@/infrastructure/loggers/console"

export function makeConsoleLogger() {
  return new ConsoleLogger()
}
