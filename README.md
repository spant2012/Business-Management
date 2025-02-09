CREATE DATABASE business_management;
```

### 3. Application Installation

1. Clone this repository:
```bash
git clone [repository-url]
cd business-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/business_management
PGHOST=localhost
PGPORT=5432
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=business_management
```

4. Initialize the database:
```bash
npm run db:push
```

5. Build the application:
```bash
npm run build
```

6. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:5000`

## Configuration

### Database Configuration

Update the database connection settings in `.env` file:
- `PGUSER`: Your PostgreSQL username
- `PGPASSWORD`: Your PostgreSQL password
- `PGDATABASE`: Database name (default: business_management)
- `PGHOST`: Database host (default: localhost)
- `PGPORT`: Database port (default: 5432)

### Server Configuration

The server runs on port 5000 by default. To change this:
1. Set the `PORT` environment variable in `.env`
2. Restart the server

## Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

## Production Deployment

For production deployment:

1. Set production environment variables:
```env
NODE_ENV=production
```

2. Build the application:
```bash
npm run build
```

3. Start the production server:
```bash
npm start