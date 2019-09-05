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
    public class FullCalendarEventDTO {
        public string title {get; set;}
        public DateTime? start {get; set;}
    }
 
    [Route("api/[controller]")]
    public class EventController : Controller
    {
        private readonly AppSettings _appSettings;

        public EventController(AppSettings appSettings)  {
            _appSettings = appSettings;
        }

        //https://www.schuebelsoftware.com/ssscalcoreapi
        //FullCalendar control sends: https://localhost:5021/api/event/eventsModelLoad?start=2019-06-30T00%3A00%3A00-05%3A00&end=2019-08-11T00%3A00%3A00-05%3A00
        [HttpGet]
        [Route("eventsModelLoad")]
          public async Task<IEnumerable<FullCalendarEventDTO>> EventsModelLoad([FromQuery] DateTime start,  DateTime end)
        {
            //var requests = this.HttpContext.Request.QueryString.Value;
            var requests = $"?page=1&pageSize=99&sort[0][field]=Date&sort[0][dir]=asc&filter[logic]=and&filter[filters][0][field]=Date&filter[filters][0][operator]=gte&filter[filters][0][value]={start.ToShortDateString()}&filter[filters][1][field]=Date&filter[filters][1][operator]=lte&filter[filters][1][value]={end.ToShortDateString()}";
            var result = await PullWebApiData<List<EventDTO>>.RequestDataPaged(_appSettings.SSSWebApiUrl, "api/event", requests) ;

            var transformEvent = from evt in result.data
                                    select new FullCalendarEventDTO {
                                        start=evt.Date,
                                        title=evt.Description
                                    };

            return transformEvent;

        }

        [HttpGet]
        public async Task<FilterDTO<List<EventDTO>>> GetFiltered()
        {
            var requests = this.HttpContext.Request.QueryString.Value;
 //requests = "?page=1&pageSize=20&sort[0][field]=Date&sort[0][dir]=asc&filter[logic]=and&filter[filters][0][field]=Date&filter[filters][0][operator]=gte&filter[filters][0][value]=2019-06-30";
            return await PullWebApiData<List<EventDTO>>.RequestDataPaged(_appSettings.SSSWebApiUrl, "api/event", requests) ;

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
