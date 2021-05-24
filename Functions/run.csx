#r "Newtonsoft.Json"

using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    dynamic data = JsonConvert.DeserializeObject(requestBody);

    string responseMessage = "";
    if (data.x != null && data.y != null) {
        int sum = data.x + data.y;
        responseMessage = $"The sum of {data.x} and {data.y} is {sum}";
    } else {
        responseMessage = "The request body needs an \"x\" key and a \"y\" key";
    }

    return new OkObjectResult(responseMessage);
}
