# File Upload Backend Service

This is a backend service for uploading audio and video files to Cloudinary and storing their metadata in MongoDB. The service is built using Node.js, Express.js, MongoDB, and Cloudinary.

## Features
- Upload audio and video files to Cloudinary.
- Store file metadata (e.g., file name, URL, type, upload time) in MongoDB.
- Automatically detect file type (audio/video) and organize files into folders.
- Serve transformed URLs for browser compatibility.

## Design Approach
The backend follows a layered architecture with a focus on modularity, scalability, and maintainability:

- **API Layer**: Handles incoming HTTP requests and routes them to the appropriate controller.
- **Controller Layer**: Manages request/response logic and calls services for business logic.
- **Service Layer**: Contains core business logic (e.g., file upload, database operations).
- **Data Access Layer**: Interacts with MongoDB to store and retrieve file metadata.
- **Integration Layer**: Manages interactions with Cloudinary for file uploads.
- **Middleware Layer**: Handles error handling and logging.

---
## Setup Instructions

### Clone the Repository:
```sh
git clone https://github.com/your-username/file-upload-backend.git
cd file-upload-backend
```

### Install Dependencies:
```sh
npm install
```

### Set Up Environment Variables:
Create a `.env` file in the root directory and add the following variables:
```sh
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fileupload
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

### Start MongoDB:
Ensure MongoDB is running locally or update the `MONGODB_URI` to point to your MongoDB instance.

---
## Running the Service

### Start the Server:
```sh
npm start
```

### Access the Service:
The backend service will be running at `http://localhost:3000`.

---
## API Documentation

### Upload a File
**Endpoint:**
```
POST /api/auth/upload
```
**Request:**
- `file`: Audio or video file (multipart form-data)

**Response:**
```json
{
  "fileName": "Recording (2).m4a",
  "fileUrl": "https://res.cloudinary.com/dpsenybgc/video/upload/f_auto/v1739295138/AudioUploads/s8zpc7dwyhj6hbuxlzjt.mp4",
  "type": "audio",
  "_id": "67ab89a2fa90c6f4992270a3",
  "uploadedAt": "2025-02-11T17:32:18.829Z",
  "__v": 0
}
```

---

### Fetch All Uploaded Files
**Endpoint:**
```
GET /api/auth/files
```
**Response:**
```json
{
  "totalFiles": 8,
}
```

---
## Dependencies
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **Mongoose**: MongoDB ODM.
- **Cloudinary**: File upload and transformation.
- **Multer**: Middleware for handling file uploads.
- **Dotenv**: Environment variable management.

---
## File Upload Flow
1. Client sends a file upload request.
2. Request is routed to the `uploadMedia` controller.
3. Controller calls the `FileService` to handle the upload.
4. `FileService` uploads the file to Cloudinary and saves metadata to MongoDB.
5. Response is sent back to the client.

---
## Design Diagram
```
+-------------------+       +-------------------+       +-------------------+
|   Client (React)  | ----> |   API Gateway     | ----> |   File Upload     |
+-------------------+       +-------------------+       +-------------------+
                                |                           |
                                v                           v
                        +-------------------+       +-------------------+
                        |   Auth Service    |       |   File Management |
                        +-------------------+       +-------------------+
                                |                           |
                                v                           v
                        +-------------------+       +-------------------+
                        |   Database (MongoDB)     |   Cloudinary      |
                        +-------------------+       +-------------------+
```

