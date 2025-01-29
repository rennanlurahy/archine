import { Name } from "@/domain/value-objects/name"
import { Logger } from "@/shared/abstractions/logger"
import { UseCase } from "@/shared/abstractions/use-case"
import fs from "fs"
import path from "path"

export class Init extends UseCase<[Name, Name], void> {
  public constructor(private readonly logger: Logger) {
    super()
  }

  public async execute(name: Name, directory: Name) {
    const structure = {
      src: {
        application: {
          "use-cases": {
            "hello-world": this.createUseCaseStructure("hello-world"),
          },
          errors: {},
          services: {},
        },
        domain: {
          entities: {},
          "value-objects": {},
          errors: {},
          services: {},
        },
        infrastructure: {
          loggers: {},
          controllers: {},
        },
        main: {
          factories: {},
          "entry-points": {},
        },
        shared: {},
      },
    }

    this.logger.info("Criando estrutura de arquivos e pastas")
    this.createDirectoryTree(directory.toString(), structure)

    this.logger.info("Projeto iniciado com sucesso!")
  }

  private createDirectoryTree(
    basePath: string,
    tree: Record<string, any>,
  ): void {
    for (const [name, content] of Object.entries(tree)) {
      const dirPath = path.join(basePath, name)
      if (!fs.existsSync(dirPath)) {
        this.logger.info(`Criando diretório ${dirPath}`)
        fs.mkdirSync(dirPath, { recursive: true })
      } else {
        this.logger.warn(`O diretório ${dirPath} já existe.`)
      }

      if (typeof content === "object" && !Array.isArray(content)) {
        this.createDirectoryTree(dirPath, content) // Recurse into subdirectories
      } else if (Array.isArray(content)) {
        content.forEach((fileContent) => {
          this.createFile(dirPath, fileContent.name, fileContent.content)
        })
      }
    }
  }

  private createFile(dirPath: string, fileName: string, content: string): void {
    const filePath = path.join(dirPath, fileName)
    if (!fs.existsSync(filePath)) {
      this.logger.info(`Criando arquivo ${filePath}`)
      fs.writeFileSync(filePath, content)
    } else {
      this.logger.warn(`O arquivo ${filePath} já existe.`)
    }
  }

  private createUseCaseStructure(useCaseName: string): Record<string, any> {
    return [
      {
        name: "index.ts",
        content: `export * from './use-case';\nexport * from './use-case.protocol';`,
      },
      {
        name: "use-case.ts",
        content: `// Implementation of the ${useCaseName} use case\nexport class ${this.capitalize(useCaseName)}UseCase {\n  execute(): string {\n    return 'Hello, world!';\n  }\n}`,
      },
      {
        name: "use-case.protocol.ts",
        content: `// Protocols for the ${useCaseName} use case\nexport interface ${this.capitalize(useCaseName)}UseCaseProtocol {\n  execute(): string;\n}`,
      },
      {
        name: "use-case.spec.ts",
        content: `// Tests for the ${useCaseName} use case\nimport { ${this.capitalize(useCaseName)}UseCase } from './use-case';\n\ndescribe('${this.capitalize(useCaseName)}UseCase', () => {\n  it('should return Hello, world!', () => {\n    const useCase = new ${this.capitalize(useCaseName)}UseCase();\n    expect(useCase.execute()).toBe('Hello, world!');\n  });\n});`,
      },
    ]
  }

  private capitalize(str: string): string {
    return (
      str.charAt(0).toUpperCase() +
      str.slice(1).replace(/-./g, (match) => match[1].toUpperCase())
    )
  }
}
