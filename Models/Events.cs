using System;
using System.Collections.Generic;

namespace SSSCalWebCore.Models
{

    
    public partial class EventList
    {
        public int? EventId { get; set; }
        public System.DateTime? date { get; set; }
        public string Description { get; set; }
    }

    public partial class Event
    {
        public int id { get; set; }
        public string topic { get; set; }
        public DateTime? date { get; set; }
        public string description { get; set; }
    }

    public partial class Events
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public string Topic { get; set; }
        public DateTime? Date { get; set; }
        public bool? RepeatYearly { get; set; }
        public bool? RepeatMonthly { get; set; }
        public string Description { get; set; }
        public DateTime Createdate { get; set; }

        public virtual General User { get; set; }
    }
}
