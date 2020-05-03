using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoAppAPIwithJWT.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int State { get; set; }
        public string Text { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DoneDate { get; set; }
    }
}
