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
using Microsoft.AspNetCore.Authorization;

namespace SSSCalWebCore.Controllers
{

 
    [Route("api/[controller]")]
    public class PersonController : Controller
    {
        private readonly AppSettings _appSettings;

//        public PersonController(IOptions<AppSettings> appSettings)  {
//            _appSettings = appSettings.Value;
//        }
        public PersonController(AppSettings appSettings)  {
            _appSettings = appSettings;
        }
 
        [HttpGet]
        public async Task<FilterDTO<List<PersonDTO>>> GetFiltered()
        {
            string authorization = Request.Headers["Authorization"];
            var cooks = Request.Cookies;
            var requests = this.HttpContext.Request.QueryString.Value;
 //requests = "?page=1&pageSize=20&sort[0][field]=Date&sort[0][dir]=asc&filter[logic]=and&filter[filters][0][field]=Date&filter[filters][0][operator]=gte&filter[filters][0][value]=2019-06-30";
            return await PullWebApiData<List<PersonDTO>>.RequestDataPaged(_appSettings.SSSWebApiUrl, "api/person", requests) ;

        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<PersonDTO> GetById(int id)
        {
            string authorization = Request.Headers["Authorization"];
            var cooks = Request.Cookies;
            return await PullWebApiData<PersonDTO>.RequestData(_appSettings.SSSWebApiUrl, "api/person/", id.ToString()) ;
/*            
            HttpResponseMessage response = client.GetAsync($"api/person/{id}").Result;
            var persondto = JsonConvert.DeserializeObject<PersonDTO>(dto, settings);
*/            
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutPerson(int id, [FromBody] PersonDTO person)
        {

            //Request.Headers["Authorization"] already contains "Bearer " + token
            string authorization = Request.Headers["Authorization"]; 
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_appSettings.SSSWebApiUrl);
            //client.DefaultRequestHeaders.Authorization =  new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", authorization);
            client.DefaultRequestHeaders.Add("Authorization", authorization);

            var output = JsonConvert.SerializeObject(person);
            StringContent content = new StringContent(output,System.Text.Encoding.UTF8,"application/json");
  
            HttpResponseMessage response = await client.PutAsync("api/person/", content);
            if (response.IsSuccessStatusCode) {
                var dto = response.Content.ReadAsStringAsync().Result;
            }
           else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return NoContent();
/*            
            HttpResponseMessage response = client.GetAsync($"api/person/{id}").Result;
            var persondto = JsonConvert.DeserializeObject<PersonDTO>(dto, settings);
*/            
        }

    }
}
