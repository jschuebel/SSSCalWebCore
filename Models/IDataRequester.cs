using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SSSCalWebCore.Models
{
    public interface IDataRequester<T> {
       Task<T> RequestData(string apiName, string requestParams);
    }
}