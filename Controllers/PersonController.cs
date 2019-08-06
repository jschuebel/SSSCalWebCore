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
        public async Task<FilterDTO<IEnumerable<PersonDTO>>> GetFiltered()
        {
            var requests = this.HttpContext.Request.QueryString.Value;
 //requests = "?page=1&pageSize=20&sort[0][field]=Date&sort[0][dir]=asc&filter[logic]=and&filter[filters][0][field]=Date&filter[filters][0][operator]=gte&filter[filters][0][value]=2019-06-30";
            return await PullWebApiData<FilterDTO<IEnumerable<PersonDTO>>>.RequestData(_appSettings.SSSWebApiUrl, "api/person", requests) ;

        }

        [HttpGet("{id}")]
        public async Task<PersonDTO> GetById(int id)
        {
            return await PullWebApiData<PersonDTO>.RequestData(_appSettings.SSSWebApiUrl, "api/person/", id.ToString()) ;
/*            
            HttpResponseMessage response = client.GetAsync($"api/person/{id}").Result;
            var persondto = JsonConvert.DeserializeObject<PersonDTO>(dto, settings);
*/            
        }
    }
}
