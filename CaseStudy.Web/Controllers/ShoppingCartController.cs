using CaseStudy.Core.DataLayer;
using CaseStudy.Web.Dtos;
using CaseStudy.Web.Mappers;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace CaseStudy.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingCartController : ControllerBase
    {
        private readonly CarRepository _carRepository;

        public ShoppingCartController(CarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        [HttpPost]
        public async Task<ShoppingCart> Post([FromBody] int[] carIds)
        {
            var vehicles = await _carRepository.GetVehicles(carIds);

            var cars = vehicles.Select(VehicleMapper.ToCar);
            var total = vehicles.Sum(c => c.Price);

            var shoppingCart = new ShoppingCart
            {
                Cars = cars,
                Total = total
            };
            return shoppingCart;
        }
    }
}