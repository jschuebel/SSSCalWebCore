using System;
using System.Collections.Generic;
    
namespace SSSCalWebCore.Models
{
    public partial class EventDTO
    {
        public EventDTO()
        {
 //           this.Groups = new HashSet<Group>();
        }
    
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public string UserName {get; set; }
//        public string TopicDescription { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<bool> RepeatYearly { get; set; }
        public Nullable<bool> RepeatMonthly { get; set; }
        public string Description { get; set; }
        public System.DateTime Createdate { get; set; }
        public string Topic { get; set; }
    
        public virtual General CreateUser { get; set; }
        public virtual Topic topicf { get; set; }
 //       public virtual ICollection<Group> Groups { get; set; }
    }
}