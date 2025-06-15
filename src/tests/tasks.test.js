const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Task = require('../models/Task');

describe('Task API', () => {
  beforeAll(async () => {
    // Connect to test database in Atlas
    const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST || process.env.MONGODB_URI.replace('/todolist', '/todo-test');
    await mongoose.connect(MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to test database:', MONGODB_URI_TEST);
  });

  afterAll(async () => {
    // Clean up and close connection
    await Task.deleteMany({});
    await mongoose.connection.close();
    console.log('Test database connection closed');
  });

  beforeEach(async () => {
    // Clear tasks before each test
    await Task.deleteMany({});
    console.log('Test database cleared');
  });

  // Test Case 1: Create a new task
  describe('POST /api/tasks', () => {
    it('should create a new task successfully', async () => {
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
      expect(response.body._id).toBeDefined();

      // Verify task was saved in database
      const savedTask = await Task.findById(response.body._id);
      expect(savedTask).toBeTruthy();
      expect(savedTask.title).toBe(taskData.title);
    });

    it('should handle invalid task data', async () => {
      const invalidTaskData = {
        description: 'Test Description'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTaskData);

      expect(response.status).toBe(400);
    });
  });

  // Test Case 2: Delete a task
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

    it('should handle non-existent task ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/tasks/${nonExistentId}`);

      expect(response.status).toBe(404);
    });
  });
}); 