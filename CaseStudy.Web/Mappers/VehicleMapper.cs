using CaseStudy.Core.Models;
using CaseStudy.Web.Dtos;

namespace CaseStudy.Web.Mappers
{
    public static class VehicleMapper
    {
        public static Car ToCar(Vehicle v)
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