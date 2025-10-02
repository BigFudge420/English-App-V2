# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# English-App-V2: Google Drive Middleman

This website is a modern React + Vite application that acts as a middleman between users and a Google Drive account. It allows users to browse folders and files stored in a specific Google Drive, providing a clean and responsive UI.

## Features

- **Browse Folders:** View all folders in the root of the connected Google Drive.
- **Navigate Folders:** Click on a folder to view its contents (subfolders and files).
- **Open Files:** Click on a file to open it in Google Drive.
- **Responsive UI:** Built with Tailwind CSS for a modern look and mobile-friendly experience.
- **Loading & Empty States:** User-friendly feedback when loading or when no files/folders are present.

## How It Works

1. **Google Drive API:**
	- The app uses the Google Drive API (with an API key) to fetch folder and file data from a specific Drive.
	- Only files and folders that are accessible with the provided API key are shown.

2. **Folder Navigation:**
	- The home page lists all folders in the root directory.
	- Clicking a folder navigates into it, showing its contents.
	- You can keep navigating deeper into subfolders.

3. **File Access:**
	- Files are shown with their names and a link to open them directly in Google Drive.

4. **UI/UX:**
	- The interface uses React components and Tailwind CSS for a clean, modern look.
	- Loading spinners and empty states are shown as appropriate.

## Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Build Tailwind CSS (in a separate terminal)

```
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

### 3. Start the development server

```
npm run dev
```

### 4. Open the app

Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Configuration

- The Google Drive API key and root folder ID are set in the source code (`src/components/home.jsx` and related files).
- To use your own Drive, update these values with your own API key and folder ID.

## Project Structure

- `src/components/` — React components for UI and Drive browsing
- `src/input.css` — Tailwind CSS source
- `src/output.css` — Generated CSS (do not edit manually)
- `tailwind.config.js` — Tailwind configuration
- `postcss.config.cjs` — PostCSS configuration

## Notes

- This app is read-only and does not allow uploading or deleting files.
- Make sure your Google Drive API key has the correct permissions and quota.

---
Feel free to contribute or modify for your own use!
