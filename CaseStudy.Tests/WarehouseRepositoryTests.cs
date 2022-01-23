using CaseStudy.Core.DataLayer;
using CaseStudy.Core.Models;
using FluentAssertions;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace CaseStudy.Tests
{
    public class WarehouseRepositoryTests
    {
        [Fact]
        public async Task GetVehiclesOrderByDateAdded_should_return_vehicles_from_all_warehouses_ordered_by_date_added()
        {
            var carRepository = MakeCarRepository();
            var sut = await carRepository.GetVehiclesOrderedByDateAdded();

            sut.Should().HaveCount(5);
            sut[0].Id.Should().Be(1);
            sut[1].Id.Should().Be(2);
            sut[2].Id.Should().Be(3);
            sut[3].Id.Should().Be(4);
            sut[4].Id.Should().Be(5);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        public async Task GetVehicles_should_return_vehicle_with_requested_id(int id)
        {
            var carRepository = MakeCarRepository();
            var sut = await carRepository.GetVehicle(id);

            sut.Id.Should().Be(id);
        }

        private static CarRepository MakeCarRepository()
        {
            var warehouses = MakeWarehouses();
            var mock = new Mock<IWarehouseProvider>();
            mock.Setup(w => w.GetWarehouses()).ReturnsAsync(warehouses);

            var carRepository = new CarRepository(mock.Object);
            return carRepository;
        }

        private static Vehicle MakeVehicle(int id)
        {
            return new Vehicle {Id = id, DateAdded = new DateTime(2020, 01, id)};
        }

        private static Warehouse[] MakeWarehouses()
        {
            var location_1 = new Location
            {
                Latitude = "47.13111",
                Longitude = "-61.54801"
            };
            var cars_1 = new Cars
            {
                Location = "West wing",
                Vehicles = new[]
                {
                    MakeVehicle(4),
                    MakeVehicle(3),
                    MakeVehicle(2),
                }
            };
            var warehouse_1 = new Warehouse
            {
                Id = "1",
                Name = "Warehouse A",
                Location = location_1,
                Cars = cars_1,
            };
            var location_2 = new Location
            {
                Latitude = "15.95386",
                Longitude = "7.06246"
            };
            var cars_2 = new Cars
            {
                Location = "East wing",
                Vehicles = new[]
                {
                    MakeVehicle(5),
                    MakeVehicle(1),
                }
            };
            var warehouse_2 = new Warehouse
            {
                Id = "2",
                Name = "Warehouse B",
                Location = location_2,
                Cars = cars_2
            };

            var warehouses = new[]
            {
                warehouse_1,
                warehouse_2
            };
            return warehouses;
        }
    }
}