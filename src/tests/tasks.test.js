const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Task = require('../models/Task');

describe('Task API', () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/todo-test');
  });

  afterAll(async () => {
    // Clean up and close connection
    await Task.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear tasks before each test
    await Task.deleteMany({});
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
      expect(response.body.completed).toBe(false);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      // First create a task
      const task = await Task.create({
        title: 'Task to Delete',
        description: 'Will be deleted'
      });

      const response = await request(app)
        .delete(`/api/tasks/${task._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task deleted');

      // Verify task is actually deleted
      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).toBeNull();
    });
  });
}); 