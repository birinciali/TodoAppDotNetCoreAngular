using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoAppAPIwithJWT.Models
{
    public class TodoListViewModel
    {
        public List<Todo> Pendings { get; set; }
        public List<Todo> Inprogress { get; set; }
        public List<Todo> Done { get; set; }
    }
}
