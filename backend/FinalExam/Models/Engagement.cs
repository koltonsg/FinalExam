using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FinalExam.Models;

public partial class Engagement
{
    [Key]
    public int EngagementNumber { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public TimeSpan? StartTime { get; set; }

    public TimeSpan? StopTime { get; set; }

    public int? ContractPrice { get; set; }

    public int? CustomerId { get; set; }

    public int? AgentId { get; set; }

    public int? EntertainerId { get; set; }
}
