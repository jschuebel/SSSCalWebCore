using System;
using System.Collections.Generic;

namespace SSSCalWebCore.Models
{
    public partial class General
    {
        public General()
        {
            Events = new HashSet<Events>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string HomePhone { get; set; }
        public string Work { get; set; }
        public string Pager { get; set; }
        public string Fax { get; set; }
        public string Mobile { get; set; }
        public string EMail { get; set; }
        public int AddressId { get; set; }
        public bool BirthdayAlert { get; set; }
        public DateTime Createdate { get; set; }

        public virtual Address Address { get; set; }
        public virtual ICollection<Events> Events { get; set; }
    }
}
