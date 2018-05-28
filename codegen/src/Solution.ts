import ProjectMapping from './ProjectMapping'

export default class Solution {

  public readonly upstreamNamespacePrefix: string

  public readonly upstreamSolutionDir: string

  public readonly generatedNamespacePrefix: string

  public readonly generatedSolutionDir: string

  public readonly projectMappings = new Array<ProjectMapping>()

  public readonly findReplace: Map<RegExp, string>

  constructor(
    upstreamNamespacePrefix: string,
    upstreamSolutionDir: string,
    generatedNamespacePrefix: string,
    generatedSolutionDir: string,
    findReplace: Map<RegExp, string>
  ) {
    this.upstreamNamespacePrefix = upstreamNamespacePrefix
    this.upstreamSolutionDir = upstreamSolutionDir
    this.generatedNamespacePrefix = generatedNamespacePrefix
    this.generatedSolutionDir = generatedSolutionDir
    this.findReplace = findReplace
  }

  public addProjectMapping(upstreamProjectDir: string, generatedUpstreamDir: string, generatedProjectDir: string) {
    this.projectMappings.push(new ProjectMapping(
      this,
      `${this.upstreamSolutionDir}/${upstreamProjectDir}`,
      `${this.generatedSolutionDir}/${generatedUpstreamDir}`,
      `${this.generatedSolutionDir}/${generatedProjectDir}`
    ))
  }

  public async codeGenAsync() {
    for (let projectMapping of this.projectMappings) {
      await projectMapping.codeGenAsync()
    }

  }

}
