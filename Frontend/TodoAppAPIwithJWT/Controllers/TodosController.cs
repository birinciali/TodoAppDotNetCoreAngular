using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoAppAPIwithJWT.Data;
using TodoAppAPIwithJWT.Models;

namespace TodoAppAPIwithJWT.Controllers
{
    [Produces("application/json")]
    [Route("api/Todos")]
    public class TodosController : Controller
    {
        private IAppRepository _appRepository;
        public TodosController(IAppRepository appRepository)
        {
            _appRepository = appRepository;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            var todos = _appRepository.GetTodos();
            List<Todo> pendings = new List<Todo>();
            List<Todo> inprogress = new List<Todo>();
            List<Todo> done = new List<Todo>();

            foreach (var item in todos)
            {
                if (item.State == 0)
                {
                    pendings.Add(item);
                }
                if (item.State == 1)
                {
                    inprogress.Add(item);
                }
                if (item.State == 2)
                {
                    done.Add(item);
                }
            }

            TodoListViewModel model = new TodoListViewModel
            {
                Pendings = pendings.ToList(),
                Inprogress = inprogress.ToList(),
                Done = done.ToList()
            };

            return Json(model);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var todos = _appRepository.GetTodoByUser(id);
            List<Todo> pendings = new List<Todo>();
            List<Todo> inprogress = new List<Todo>();
            List<Todo> done = new List<Todo>();

            foreach (var item in todos)
            {
                if (item.State == 0)
                {
                    pendings.Add(item);
                }
                if (item.State == 1)
                {
                    inprogress.Add(item);
                }
                if (item.State == 2)
                {
                    done.Add(item);
                }
            }

            TodoListViewModel model = new TodoListViewModel
            {
                Pendings = pendings.ToList(),
                Inprogress = inprogress.ToList(),
                Done = done.ToList()
            };

            return Json(model);
        }

        public IActionResult Post([FromBody]Todo todo)
        {
            try
            {
                _appRepository.Add(todo);
                _appRepository.SaveAll();
                return new StatusCodeResult(201);
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody]TodoListViewModel todo)
        {
            try
            {
                foreach (var item in todo.Done)
                {
                    item.State = 2;
                    _appRepository.Update(item);
                    _appRepository.SaveAll();
                }
                foreach (var item in todo.Inprogress)
                {
                    item.State = 1;
                    _appRepository.Update(item);
                    _appRepository.SaveAll();
                }

                foreach (var item in todo.Pendings)
                {
                    item.State = 0;
                    _appRepository.Update(item);
                    _appRepository.SaveAll();
                }
                return Ok(todo);
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Todo todo)
        {
            try
            {
                _appRepository.Delete(todo);
                _appRepository.SaveAll();
                return Ok();
            }
            catch (System.Exception)
            {
                throw;
            }
        }

    }
}