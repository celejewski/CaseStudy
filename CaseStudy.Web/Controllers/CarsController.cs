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
    [Route("[controller]")]
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
                YearModel = v.YearModel
            };
        }
    }
}