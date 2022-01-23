using CaseStudy.Core.DataLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
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
        public async Task<object> Get()
        {
            var vehicles = await _carRepository.GetVehiclesOrderedByDateAdded();
            return vehicles;
        }
    }
}