using System;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using OmniSharp.Extensions.LanguageServer.Client;
using OmniSharp.Extensions.LanguageServer.Protocol.Models;

namespace AutoEF.CodeGen.Client
{
    public class Program
    {

        private static String WorkDir = "/home/caleb/Projects/AutoEF/CodeGen/upstream/EntityFrameworkCore";

        public static void Main(string[] args)
        {
            var loggerFactory = new LoggerFactory()
                .AddConsole()
                .AddDebug();
            
            var processStartInfo = new ProcessStartInfo("/usr/local/bin/omnisharp-vscode");
//            var processStartInfo = new ProcessStartInfo("/bin/bash");
//            processStartInfo.Arguments = "/usr/local/bin/omnisharp-vscode";
//            var processStartInfo = new ProcessStartInfo("/bin/sleep");
//            processStartInfo.Arguments = "10";
            processStartInfo.WorkingDirectory = WorkDir;
                
            var client = new LanguageClient(loggerFactory, processStartInfo);
            Run(client).GetAwaiter().GetResult();

            while (true)
            {
                Thread.Sleep(1000);
            }
        }

        private static async Task Run(LanguageClient client)
        {
            Console.WriteLine("start init");
            await client.Initialize(WorkDir);
            Console.WriteLine("end init");
            
            var worspaceSymbolParams = new WorkspaceSymbolParams();
            worspaceSymbolParams.Query = "*";
            Console.WriteLine("start query");
            var response = await client.SendRequest<WorkspaceSymbolInformationContainer>("workspace/symbol", worspaceSymbolParams);
            Console.WriteLine(response.FirstOrDefault()?.Name);
            Console.WriteLine(response.FirstOrDefault()?.Kind);
            Console.WriteLine(response.FirstOrDefault()?.Location);
            Console.WriteLine("end query");
        }

    }
}
