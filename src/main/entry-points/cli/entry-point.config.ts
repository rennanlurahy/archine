import { Command } from "commander"
import { makeInitController } from "@/main/factories/controllers/generate-structure/factory"

export function setInitCommand(program: Command) {
  program
    .command("generate")
    .description("Generate a project structure.")
    .option("-n, --name <name>", "Name of the project")
    .option("-d, --directory <directory>", "Target directory for the project")
    .action((options) => {
      const controller = makeInitController()
      controller.handle(options)
    })
}
