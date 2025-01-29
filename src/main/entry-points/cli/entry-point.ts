#!/usr/bin/env node
import { Command } from "commander"
import { setInitCommand } from "./entry-point.config"

const program = new Command()

setInitCommand(program)

program.parse(process.argv)
