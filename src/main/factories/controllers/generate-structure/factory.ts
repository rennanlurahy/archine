import { Init } from "@/infrastructure/controllers/generate-structure"
import { makeInitUseCase } from "@/main/factories/use-cases/generate-structure/factory"
import { makeConsoleLogger } from "@/main/factories/loggers/console"

export function makeInitController() {
  const useCase = makeInitUseCase()
  const logger = makeConsoleLogger()
  return new Init(useCase, logger)
}
