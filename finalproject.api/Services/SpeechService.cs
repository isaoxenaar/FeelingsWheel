using Microsoft.CognitiveServices.Speech;
using System.Web;
public class SpeechService
{
    public async Task<string> GetTextSentiment(string inputText)
    {
        var text = HttpUtility.UrlEncode(inputText);
        var key = "d26601afef30b515273b6690228be191b3d1dd43";
        var url = $"https://api.kenzyai.com/?key={key}&text={text}";
        var apiResponse = "";
        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.GetAsync(url))
            {
                apiResponse = await response.Content.ReadAsStringAsync();
            }
        }
        return apiResponse;
    }
}