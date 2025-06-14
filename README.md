# One Hundred Years of Solitude API

A REST API and web application for exploring and managing information about Gabriel García Márquez's novel "One Hundred Years of Solitude".

## Features

- **General Search**: Unified search across all content categories
- **Modern Web Interface**: User-friendly UI built with TailwindCSS
- **Content Categories**:
  - Chapters
  - Characters
  - Dreams and Visions
  - Events
  - Locations
  - Symbols
  - Relationships
  - Objects

## Technologies Used

- **Backend**: Flask (Python)
- **Database**: MongoDB
- **Frontend**: HTML, JavaScript, TailwindCSS
- **Authentication**: Environment variables system for credentials

## Prerequisites

- Python 3.12+
- MongoDB (local or MongoDB Atlas account)
- Node.js (for TailwindCSS)

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd api_100_soledad
```

2. Create and activate virtual environment:

```bash
python -m venv env
# On Windows
env\Scripts\activate
# On Unix or MacOS
source env/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Configure environment variables:
   Create a `.env` file in the project root:

```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_CONNECTION=local # or 'cloud' for MongoDB Atlas
```

5. Start the application:

```bash
python run.py
```

The application will be available at `http://localhost:3000`

## Using the API

### Main Endpoints

- `GET /`: Application homepage
- `POST /general-search`: Global search across all categories
- `GET /view/<id>/<type>`: Detailed view of a specific item

### Category Endpoints

Each category (chapters, characters, dreams_visions, etc.) has the following endpoints:

- `POST /{category}-search`: Search within a specific category
- `GET /search-specific-{category}/<id>`: Get specific item
- `POST /insert/{category}`: Create new item
- `PUT /general-update`: Update existing item
