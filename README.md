README
# abby-normal

## README
Installation Instructions for .NET 9 and Jint
 

## Prerequisites
.NET 9 SDK installed on your system
Installing .NET 9
Download the .NET 9 SDK from the official .NET download page.
Follow the installation instructions for your operating system.
Installing Jint via NuGet Package Manager (Visual Studio)
Open your C# project in Visual Studio.
Right-click on your project in the Solution Explorer and select Manage NuGet Packages.
Search for Jint in the Browse tab.
Select the Jint package and click Install.
Installing Jint via .NET CLI
Open a terminal or command prompt.
Navigate to the directory containing your C# project file (.csproj).
Run the following command to install the Jint NuGet package:




  
### Installing Jint via PowerShell  
1. Open PowerShell as an administrator.  
2. Navigate to the directory containing your C# project file (`.csproj`) using the `Set-Location` cmdlet or `cd` alias:  
   ```powershell  
Set-Location "C:\Path\To\Your\Project"  
or


cd "C:\Path\To\Your\Project"  
Run the following command to install the Jint NuGet package:

dotnet add package Jint

  
### Verifying the Installation  
1. Create a new C# class file (e.g., `JavaScriptExecutor.cs`) and add the following code:  
   ```csharp  
using Jint;  
  
public class JavaScriptExecutor  
{  
    public void ExecuteJavaScript()  
    {  
        var engine = new Engine();  
        var result = engine.Execute("1 + 2").GetCompletionValue();  
        Console.WriteLine(result); // Output: 3  
    }  
}  
Call the ExecuteJavaScript method from your main program or test class.
Verify that the JavaScript code is executed correctly and the result is printed to the console.
Troubleshooting
If you encounter issues during installation, ensure that your .NET version is compatible with the Jint package.
Check the NuGet package version and update to the latest version if necessary.