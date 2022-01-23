using System;

namespace CaseStudy.Web.Dtos
{
    public class Car
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int YearModel { get; set; }
        public decimal Price { get; set; }
        public bool Licensed { get; set; }
        public DateTime DateAdded { get; set; }
        public string WarehouseId { get; set; }
        public string WarehouseName { get; set; }
        public string WarehouseLocationLatitude { get; set; }
        public string WarehouseLocationLongitude { get; set; }
        public string CarsLocation { get; set; }
    }
}