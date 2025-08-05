# Tiffin Tracker

A mobile-responsive React application for tracking daily lunch box consumption and costs.

## Features

- ✅ **Mobile Responsive Design** - Works perfectly on all screen sizes
- ✅ **Date-wise Tracking** - Track lunch boxes consumed each day
- ✅ **Automatic Cost Calculation** - 80rs per lunch box
- ✅ **MongoDB Storage** - All data stored in MongoDB
- ✅ **Statistics Dashboard** - View total boxes, amount, and days
- ✅ **CRUD Operations** - Add, edit, and delete records
- ✅ **Modern UI** - Clean and intuitive interface
- ✅ **Toast Notifications** - User-friendly feedback

## Project Structure

```
Tiffin/
├── Backend/
│   ├── server.js
│   └── package.json
└── Frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── StatsContainer.js
    │   │   ├── AddEntryForm.js
    │   │   ├── RecordsList.js
    │   │   └── RecordItem.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)

### Backend Setup

1. Navigate to the Backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the Frontend folder:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Add Entry**: Select a date and enter the number of lunch boxes consumed
2. **View Statistics**: See total boxes, total amount, and total days tracked
3. **Edit Records**: Click the "Edit" button on any record to modify the quantity
4. **Delete Records**: Click the "Delete" button to remove a record
5. **Mobile Use**: The app is fully responsive and works great on mobile devices

## API Endpoints

- `GET /api/lunchbox` - Get all records
- `POST /api/lunchbox` - Add new record
- `PUT /api/lunchbox/:id` - Update existing record
- `DELETE /api/lunchbox/:id` - Delete record
- `GET /api/stats` - Get statistics (total boxes, amount, days)

## Cost Calculation

Each lunch box costs ₹80. The total cost is automatically calculated as:
**Total Cost = Quantity × 80**

## Database Schema

```javascript
{
  date: Date (unique),
  quantity: Number (minimum 0),
  totalCost: Number,
  timestamps: true
}
```

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS

### Frontend
- React 18
- Axios for API calls
- React Toastify for notifications
- CSS Grid and Flexbox for responsive design

## Mobile Responsive Features

- Adaptive grid layout for statistics cards
- Touch-friendly buttons and inputs
- Optimized typography for mobile screens
- Responsive navigation and spacing
- Toast notifications adapted for mobile
