import * as fs from 'async-file'
import * as glob from 'glob-promise'
import CodeFile from './CodeFile';
import Solution from './Solution';
import * as rimrafLegacy from 'rimraf'
import { promisify } from 'util'

const rimraf = promisify(rimrafLegacy)

export default class ProjectMapping {

  public readonly solution: Solution

  public readonly upstreamProjectDir: string

  public readonly generatedUpstreamDir: string

  public readonly generatedProjectDir: string

  constructor(solution: Solution, upstreamProjectDir: string, generatedUpstreamDir: string, generatedProjectDir: string) {
    this.solution = solution
    this.upstreamProjectDir = upstreamProjectDir
    this.generatedUpstreamDir = generatedUpstreamDir
    this.generatedProjectDir = generatedProjectDir
  }

  public async codeGenAsync() {
    await rimraf(`${this.generatedUpstreamDir}`)
    let codeFilePaths = await glob.promise(`${this.upstreamProjectDir}/**/*.cs`)
    let promises = []
    for (let codeFilePath of codeFilePaths) {
      let codeFile = new CodeFile(this, codeFilePath)
      promises.push(codeFile.codeGenAsync())
    }
    await Promise.all(promises)
  }

}
