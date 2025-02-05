# React + Vite

🎨 ArtNest - Art Supplies List

A beautifully designed React-based application for managing your art supplies.
This project showcases state management, API interactions, and custom styling, while allowing users to add, remove, and print their personal art materials lists.


✨ Features

🖌 Select recommended materials from a predefined list.
✏️ Add custom materials to your personal list.
🗑 Remove items using an animated delete button.
🖨 Print your list (only the list, not the entire page).
🎭 Beautiful, custom UI with animated buttons, icons, and creative styling.
📡 Real-time synchronization with Airtable API.

🛠 Built With

React (Vite)
Airtable API
CSS Modules
Google Fonts (Inter)
Custom SVG & WebP Icons

📌 Future Improvements

✅ User authentication & saved lists
✅ Dark mode
✅ Drag & drop sorting

📜 License

This project is open-source under the MIT License.

🔹 Created with ❤️ by Maria Zasypkina
🔹 Part of the Code the Dream React Course (Ibis) 🚀

Routes:

http://localhost:5173 - main page
http://localhost:5173/supplies - supplies list
http://localhost:5173/about - about project page


🚀 Getting Started

1️⃣ Clone the Repository
git clone https://github.com/MariaZasypkina/Art_Supplies_list.git
cd artnest-supplies-list

2️⃣ Install Dependencies
npm install

3️⃣ Create a .env File
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_AIRTABLE_TABLE_NAME=your_table_name_here

4️⃣ Run the Project
npm run dev

Project Structure:

package-lock.json
├── package.json
├── public
│   ├── images
│   │   ├── background.webp
│   │   ├── banner.webp
│   │   ├── banner1.webp
│   │   ├── icons
│   │      ├── calligraphy.webp
│   │      ├── candlemaking.webp
│   │      ├── creativity.webp
│   │      ├── decoupage.webp
│   │      ├── digitalart.webp
│   │      ├── drawing.webp
│   │      ├── jewelrymaking.webp
│   │      ├── mosaic.webp
│   │      ├── painting.webp
│   │      ├── photography.webp
│   │      ├── pyrography.webp
│   │      ├── sculpting.webp
│   │      ├── soapmaking.webp
│   │      ├── trash.webp
│   │      └── weaving.webp
│   │  
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── airtableAPI.js
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── AddTodoForm.jsx
│   │   ├── AddTodoForm.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── InputWithLabel.jsx
│   │   ├── InputWithLabel.module.css
│   │   ├── TodoList.jsx
│   │   ├── TodoList.module.css
│   │   ├── TodoListItem.jsx
│   │   ├── TodoListItem.module.css
│   │   └── materials.js
│   ├── index.css
│   └── main.jsx
└── vite.config.js

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh





