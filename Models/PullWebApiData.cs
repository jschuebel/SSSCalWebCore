using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Microsoft.Extensions.Options;
using SSSCalWebCore.Models;
using Newtonsoft.Json;
using System.Net.Http;
using System.Runtime.Serialization.Json;

namespace SSSCalWebCore.Models
{

    public static class PullWebApiData<T> where T : new()
    {

        public static async Task<T> RequestData(string apiUrl, string apiName, string requestParams) 
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(apiUrl);
            HttpResponseMessage response = await client.GetAsync(apiName + requestParams);
            if (response.IsSuccessStatusCode)
            {
                var dto = response.Content.ReadAsStringAsync().Result;
                var settings = new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore,
                        MissingMemberHandling = MissingMemberHandling.Ignore
                    };
                var persondto = JsonConvert.DeserializeObject<T>(dto, settings);
                 return persondto;
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
           var mdl = new T();
           return mdl;

        }
    }
}