import { Init } from "@/application/use-cases/generate-structure"
import { makeConsoleLogger } from "@/main/factories/loggers/console"

export function makeInitUseCase() {
  const logger = makeConsoleLogger()
  return new Init(logger)
}
