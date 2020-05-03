using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAppAPIwithJWT.Models;

namespace TodoAppAPIwithJWT.Data
{
    public class AppRepository : IAppRepository
    {
        private DataContext _dataContext;

        public AppRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _dataContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        public Todo GetTodoById(int id)
        {
            var todo = _dataContext.Todos.FirstOrDefault(t => t.Id == id);
            return todo;
        }

        public List<Todo> GetTodoByUser(int id)
        {
            //var todos = _dataContext.Todos.Include(t => t.UserId == id).ToList();
            var todos = _dataContext.Todos.Where(t=> t.UserId==id).ToList();
            return todos;
        }

        public List<Todo> GetTodos()
        {
            var todos = _dataContext.Todos.ToList();
            return todos;
        }

        public User GetUserById(int id)
        {
            var user = _dataContext.Users.FirstOrDefault(u => u.Id == id);
            return user;
        }

        public List<User> GetUsers()
        {
            var users = _dataContext.Users.ToList();
            return users;
        }

        public bool SaveAll()
        {
            return _dataContext.SaveChanges() > 0;
        }

        public void Update<T>(T entity) where T : class
        {
            _dataContext.Update(entity);
        }
    }
}
