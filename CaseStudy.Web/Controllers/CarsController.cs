using CaseStudy.Core.DataLayer;
using CaseStudy.Web.Dtos;
using CaseStudy.Web.Mappers;
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
            var cars = vehicles.Select(VehicleMapper.ToCar);
            return cars;
        }

        [HttpGet("{id}")]
        public async Task<Car> Get(int id)
        {
            var vehicle = await _carRepository.GetVehicle(id);
            return VehicleMapper.ToCar(vehicle);
        }
    }
}