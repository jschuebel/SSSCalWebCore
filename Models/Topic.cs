using System;
using System.Collections.Generic;
    
namespace SSSCalWebCore.Models
{
    public partial class Topic
    {
        public Topic()
        {
    //        this.Events = new HashSet<Event>();
        }
    
        public int Id { get; set; }
        public string TopicTitle { get; set; }
        public System.DateTime Createdate { get; set; }

// !!! on linq Include this populates all the events for the topic inside the topic inside the event    
//        public virtual ICollection<Event> Events { get; set; }
    }
}