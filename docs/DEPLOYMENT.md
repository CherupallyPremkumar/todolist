# Backend Deployment Guide (Render)

This guide explains how to deploy the Todo List backend to Render and connect it with the frontend.

## Prerequisites

1. A Render account (sign up at [render.com](https://render.com))
2. MongoDB Atlas account with a cluster set up
3. Your backend code pushed to GitHub

## Deployment Steps

### 1. Create a New Web Service

1. Log in to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the repository containing your backend code

### 2. Configure the Service

Fill in the following details:

- **Name**: `todo-list-backend` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose the closest to your users
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3. Environment Variables

Add the following environment variables:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
PORT=10000
```

To get your MongoDB connection string:

1. Go to MongoDB Atlas
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user's password

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically start the deployment process
3. Wait for the build and deployment to complete

## Verifying Deployment

1. Once deployed, Render will provide a URL (e.g., `https://todo-list-backend.onrender.com`)
2. Test the API endpoints:
   ```bash
   # Test the health check
   curl https://todo-list-backend.onrender.com/api/tasks
   ```

## Connecting Frontend

1. Update your frontend's `.env` file:

   ```
   REACT_APP_API_URL=https://todo-list-backend.onrender.com
   ```

2. Update the CORS configuration in `src/index.js`:
   ```javascript
   const corsOptions = {
     origin: [
       "https://your-frontend-domain.vercel.app",
       "http://localhost:3000",
     ],
     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
     allowedHeaders: ["Content-Type", "Authorization"],
     credentials: true,
   };
   ```

## Monitoring and Maintenance

### Logs

- Access logs through the Render dashboard
- Monitor for any errors or issues
- Check application performance

### Scaling

- Render automatically scales based on traffic
- Free tier includes:
  - 750 hours of runtime per month
  - Automatic sleep after 15 minutes of inactivity
  - 512 MB RAM
  - Shared CPU

### Updating the Application

1. Push changes to your GitHub repository
2. Render will automatically detect changes
3. New deployment will start automatically
4. Zero-downtime deployments

## Troubleshooting

### Common Issues

1. **Application Crashes**

   - Check logs in Render dashboard
   - Verify environment variables
   - Ensure MongoDB connection is working

2. **CORS Errors**

   - Verify CORS configuration
   - Check allowed origins
   - Ensure frontend URL is correct

3. **Database Connection Issues**
   - Verify MongoDB URI
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

### Getting Help

1. Check Render's [documentation](https://render.com/docs)
2. Review MongoDB Atlas [guides](https://docs.atlas.mongodb.com)
3. Check application logs in Render dashboard

## Security Considerations

1. **Environment Variables**

   - Never commit sensitive data
   - Use Render's environment variable management
   - Rotate credentials regularly

2. **CORS**

   - Limit allowed origins
   - Use specific methods and headers
   - Enable credentials only when needed

3. **MongoDB**
   - Use strong passwords
   - Enable IP whitelist
   - Regular security audits

## Cost Management

1. **Free Tier Limits**

   - 750 hours of runtime per month
   - Automatic sleep after inactivity
   - Monitor usage in Render dashboard

2. **Upgrading**
   - Consider paid plans for production
   - More resources and features
   - No sleep mode

## Best Practices

1. **Code Organization**

   - Keep environment variables in Render
   - Use proper error handling
   - Implement logging

2. **Performance**

   - Optimize database queries
   - Use proper indexing
   - Implement caching when needed

3. **Maintenance**
   - Regular dependency updates
   - Security patches
   - Performance monitoring
