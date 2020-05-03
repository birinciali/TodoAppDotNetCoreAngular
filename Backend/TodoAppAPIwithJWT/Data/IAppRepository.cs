using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAppAPIwithJWT.Models;

namespace TodoAppAPIwithJWT.Data
{
    public interface IAppRepository 
    {
        void Add<T>(T entity) where T : class;

        void Update<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        bool SaveAll();

        List<User> GetUsers();
        List<Todo> GetTodos();
        User GetUserById(int id);
        Todo GetTodoById(int id);
        List<Todo> GetTodoByUser(int id);
    }
}
