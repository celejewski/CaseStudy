using CaseStudy.Core.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaseStudy.Core.DataLayer
{
    public class CarRepository
    {
        private readonly IWarehouseProvider _warehouseProvider;

        public CarRepository(IWarehouseProvider warehouseProvider)
        {
            _warehouseProvider = warehouseProvider;
        }

        public async Task<IList<Vehicle>> GetVehiclesOrderedByDateAdded()
        {
            var warehouses = await _warehouseProvider.GetWarehouses();
            var vehicels = warehouses.SelectMany(w => w.Cars.Vehicles);

            var vehicles = vehicels.OrderBy(v => v.DateAdded).ToArray();
            return vehicles;
        }

        public async Task<Vehicle> GetVehicle(int id)
        {
            var warehouses = await _warehouseProvider.GetWarehouses();
            var vehicles = warehouses.SelectMany(w => w.Cars.Vehicles);

            var vehicle = vehicles.Single(v => v.Id == id);
            return vehicle;
        }
    }
}