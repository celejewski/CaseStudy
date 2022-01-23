using CaseStudy.Core.Models;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace CaseStudy.Core.DataLayer
{
    public class WarehouseProvider : IWarehouseProvider
    {
        private readonly string _path;

        public WarehouseProvider(WarehouseProviderConfig warehouseProviderConfig)
        {
            _path = warehouseProviderConfig.Path;
        }

        public async Task<IList<Warehouse>> GetWarehouses()
        {
            var json = await File.ReadAllTextAsync(_path);
            var warehouses = JsonSerializer.Deserialize<Warehouse[]>(json);
            return warehouses;
        }
    }
}