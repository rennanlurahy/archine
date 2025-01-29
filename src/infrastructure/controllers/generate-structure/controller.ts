import { UseCase } from "@/shared/abstractions/use-case"
import { Name } from "@/domain/value-objects/name"
import { Logger } from "@/shared/abstractions/logger"

export class Init {
  public constructor(
    private readonly useCase: UseCase<[Name, Name], any>,
    private readonly logger: Logger,
  ) {}

  public async handle(
    options: Record<string, string | null | undefined>,
  ): Promise<void> {
    if (options.name == null) {
      this.logger.error("Nome do projeto não informado.")
      return
    }

    if (options.directory == null) {
      this.logger.error("Local do projeto não informado.")
      return
    }

    const project = Name.ofProject(options.name)
    const directory = Name.ofDirectory(options.directory)

    this.useCase.execute(project, directory)
  }
}
