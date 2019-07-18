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
    public class EventController : Controller
    {
        private readonly AppSettings _appSettings;

        public EventController(IOptions<AppSettings> appSettings)  {
            _appSettings = appSettings.Value;
        }
 
        [HttpGet]
        public async Task<FilterDTO<IEnumerable<EventDTO>>> GetFiltered()
        {
            var requests = this.HttpContext.Request.QueryString.Value;
 //requests = "?page=1&pageSize=20&sort[0][field]=Date&sort[0][dir]=asc&filter[logic]=and&filter[filters][0][field]=Date&filter[filters][0][operator]=gte&filter[filters][0][value]=2019-06-30";
            return await PullWebApiData<FilterDTO<IEnumerable<EventDTO>>>.RequestData(_appSettings.SSSWebApiUrl, "api/event", requests) ;

        }

        [HttpGet("{id}")]
        public async Task<EventDTO> GetById(int id)
        {
            return await PullWebApiData<EventDTO>.RequestData(_appSettings.SSSWebApiUrl, "api/event/", id.ToString()) ;
/*            
            HttpResponseMessage response = client.GetAsync($"api/person/{id}").Result;
            var persondto = JsonConvert.DeserializeObject<PersonDTO>(dto, settings);
*/            
        }
    }
}
