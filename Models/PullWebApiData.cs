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
        public static async Task<FilterDTO<T>> RequestDataPaged(string apiUrl, string apiName, string requestParams) 
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
                var personres = JsonConvert.DeserializeObject<T>(dto, settings);
                 var ptr = response.Headers.GetValues("Paging-TotalRecords").FirstOrDefault();
                 var persondto = new FilterDTO<T>();
                 persondto.total=int.Parse(ptr);
                 persondto.data=personres;
                 return persondto;
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
           var mdl = new FilterDTO<T>();
           return mdl;

        }

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