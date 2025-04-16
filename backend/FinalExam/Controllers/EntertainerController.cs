using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalExam.Models;

namespace FinalExam.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private EntertainmentAgencyExampleContext _EntertainerContext;

        public EntertainerController(EntertainmentAgencyExampleContext context)
        {
            _EntertainerContext = context;
        }

        [HttpGet]
        public IActionResult GetAllEntertainers()
        {
            var entertainers = _EntertainerContext.Entertainers.ToList();
            return Ok(entertainers);
        }

    }
}
