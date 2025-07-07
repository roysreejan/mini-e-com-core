# Mini E-Com Core

A minimal e-commerce backend built with Node.js, Express, and MongoDB.

## Features

- Product CRUD (Create, Read)
- Cart management (add, update, remove, clear items)
- MongoDB with Mongoose
- Error handling and route fallback
- Health check endpoint

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Environment Management**: dotenv
- **API Testing**: Postman

## Folder Structure

```
mini-e-com-core/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── cartController.js
│   │   └── productController.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── routeHandler.js
│   ├── models/
│   │   ├── Cart.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── cartRoutes.js
│   │   └── productRoutes.js
│   └── utils/
│       ├── apiFeatures.js
│       ├── appError.js
│       └── catchAsync.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── .vscode/
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB database

### Installation

1. Clone the repository
    ```sh
   git clone https://github.com/roysreejan/mini-e-com-core
   ```
2. Install dependencies:

   ```sh
   npm install
   ```

3. Copy `.env.example` to `.env` and set your MongoDB URI and other environment variables.

### Running the Server

- For development (with nodemon):

  ```sh
  npm run dev
  ```

- For production:

  ```sh
  npm start
  ```
The server will run on `http://localhost:5000` by default.

## Deployment

You can easily deploy this project to [Render](https://render.com):

1. Push your code to a public GitHub repository.
2. Sign in to [Render](https://render.com) and click "New Web Service".
3. Connect your GitHub repo and select this project.
4. Set the build command to:
   ```
   npm install
   ```
5. Set the start command to:
   ```
   npm start
   ```
6. Add your environment variables in the Render dashboard (copy from `.env.example`).
7. Click "Create Web Service" and wait for deployment to finish.

Your backend will be live on the Render-

### API Endpoints

#### Health Check

- `GET /health`

#### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product

#### Cart

- `GET /api/cart` - Get cart
- `POST /api/cart/items` - Add item to cart
- `PATCH /api/cart/items/:itemId` - Update item quantity
- `DELETE /api/cart/items/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

## Environment Variables

See [.env.example](.env.example) for required variables.

##

## License

ISC

## Author

Sreejan Roy