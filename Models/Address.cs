using System;
using System.Collections.Generic;

namespace SSSCalWebCore.Models
{
    public partial class Address
    {
        public Address()
        {
            General = new HashSet<General>();
        }

        public int Id { get; set; }
        public string Address1 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public DateTime createdate { get; set; }

        public virtual ICollection<General> General { get; set; }
    }
}
