using CaseStudy.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CaseStudy.Core.DataLayer
{
    public interface IWarehouseProvider
    {
        Task<IList<Warehouse>> GetWarehouses();
    }
}