using CaseStudy.Core.DataLayer;
using CaseStudy.Core.Models;
using CaseStudy.Web.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaseStudy.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly CarRepository _carRepository;

        public CarsController(CarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Car>> Get()
        {
            var vehicles = await _carRepository.GetVehiclesOrderedByDateAdded();
            var cars = vehicles.Select(MapVehicleToCar);
            return cars;
        }

        [HttpGet("{id}")]
        public async Task<Car> Get(int id)
        {
            var vehicle = await _carRepository.GetVehicle(id);
            return MapVehicleToCar(vehicle);
        }

        private static Car MapVehicleToCar(Vehicle v)
        {
            return new Car
            {
                Make = v.Make,
                DateAdded = v.DateAdded,
                Id = v.Id,
                Model = v.Model,
                Price = v.Price,
                Licensed = v.Licensed,
                YearModel = v.YearModel,
                WarehouseLocationLatitude = v.Warehouse.Location.Latitude,
                WarehouseLocationLongitude = v.Warehouse.Location.Longitude,
                WarehouseId = v.Warehouse.Id,
                WarehouseName = v.Warehouse.Name,
                CarsLocation = v.Location
            };
        }
    }
}