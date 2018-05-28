import Solution from './Solution'

async function main() {
  let solution = new Solution(
    'Microsoft.EntityFrameworkCore.SqlServer',
    '../upstream/EntityFrameworkCore',
    'Pomelo.EntityFrameworkCore.MySql',
    '../generated/Pomelo.EntityFrameworkCore.MySql',
    new Map<RegExp, string>([
      [/Microsoft\.EntityFrameworkCore\.SqlServer/g, 'Pomelo.EntityFrameworkCore.MySql'],
      [/SqlServer/g, 'MySql'],
      [/sqlServer/g, 'mySql'],
      [/SQL_SERVER/g, 'MY_SQL'],
      [/SQL Server/g, 'MySql']
    ])
  )
  solution.addProjectMapping('src/EFCore.SqlServer', 'upstream/EFCore.Upstream', 'src/EFCore.MySql')
  solution.addProjectMapping('test/EFCore.SqlServer.Tests', 'upstream/EFCore.Upstream.Tests', 'test/EFCore.MySql.Tests')
  solution.addProjectMapping('test/EFCore.SqlServer.FunctionalTests', 'upstream/EFCore.Upstream.FunctionalTests', 'test/EFCore.MySql.FunctionalTests')
  try {
    await solution.codeGenAsync()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
  process.exit(0)
}

main()
