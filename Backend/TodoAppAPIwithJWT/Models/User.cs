﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoAppAPIwithJWT.Models
{
    public class User
    {
        public User()
        {
            Todos = new List<Todo>();
        }
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public List<Todo> Todos { get; set; }
    }
}
