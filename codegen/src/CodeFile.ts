import * as fs from 'async-file'
import ProjectMapping from './ProjectMapping'
import * as mkdirpLegacy from 'mkdirp'
import * as path from 'path'
import { promisify } from 'util'

const mkdirp = promisify(mkdirpLegacy)

export default class CodeFile {

  public readonly projectMapping: ProjectMapping

  public readonly filePath: string

  constructor(projectMapping: ProjectMapping, filePath: string) {
    this.projectMapping = projectMapping
    this.filePath = filePath
  }

  public get solution() {
    return this.projectMapping.solution
  }

  public async codeGenAsync() {
    let data = await fs.readFile(this.filePath, 'utf8')
    let lines = data.split("\n")

    let usingImportEndLine = -1
    let namespaceLine = -1
    let namespace = ""
    let classOrInterfaceLine = -1
    let classOrInterfaceType = ""
    let classOrInterfaceName = ""

    for (let i = 0; i < lines.length; i++) {
      for (let findReplace of this.solution.findReplace) {
        lines[i] = lines[i].replace(findReplace[0], findReplace[1])
      }

      if (namespaceLine < 0 && lines[i].match(/^\s*using\s/i)) {
        usingImportEndLine = i
      }

      if (namespaceLine < 0) {
        let namespaceMatch = lines[i].match(/^\s*namespace\s+([^\s{:<]+)/i)
        if (namespaceLine < 0 && namespaceMatch) {
          namespaceLine = i
          namespace = namespaceMatch[1]
        }
      }

      if (classOrInterfaceLine < 0) {
        let classLineMatch = lines[i].match(/(class|interface)\s+([^\s{:<]+)/)
        if (classLineMatch) {
          classOrInterfaceLine = i
          classOrInterfaceType = classLineMatch[1]
          classOrInterfaceName = classLineMatch[2]
        }
      }

    }

    if (namespaceLine < 0) {
      console.error(`File '${this.filePath}': no namespace`)
    }

    if (classOrInterfaceLine < 0) {
      console.error(`File '${this.filePath}': no class/interface`)
    }

    let upstreamFilePath = this.filePath.replace(this.projectMapping.upstreamProjectDir, `${this.projectMapping.generatedUpstreamDir}`)
    let providerFilePath = this.filePath.replace(this.projectMapping.upstreamProjectDir, `${this.projectMapping.generatedProjectDir}`)

    for (let findReplace of this.solution.findReplace) {
      upstreamFilePath = upstreamFilePath.replace(findReplace[0], findReplace[1])
      providerFilePath = providerFilePath.replace(findReplace[0], findReplace[1])
    }

    await mkdirp(path.dirname(upstreamFilePath))
    await fs.writeFile(upstreamFilePath, lines.join("\n"), "utf8")

    await mkdirp(path.dirname(providerFilePath))

    console.log(upstreamFilePath)
  }
}
