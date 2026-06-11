# CMS — Content Management System

A single-page Content Management System built with Angular (Angular CLI v19). The application manages contacts, documents, and messages, with data persisted to a MongoDB database through a separate Node/Express backend API.

## Features

The application is organized into three feature areas. The Contacts feature provides full create, view, edit, and delete (CRUD) functionality with a contact-list, contact-detail, and contact-item component structure, a custom filter pipe for searching contacts, and cross-component communication. The Documents feature lets you browse and manage documents using a nested menu and a custom dropdown directive in the shared module. The Messages feature lets you post and view messages.

Navigation across features uses the Angular Router, data entry is handled with Angular forms, and all data access happens over Angular's HttpClient against a Node/Express REST API backed by MongoDB.

## Tech Stack

Frontend: Angular (CLI v19) with TypeScript. Styling: CSS. Backend: Node.js with Express. Database: MongoDB.

## Project Structure

```
src/app/
  contacts/   Contact feature: list, detail, item, edit, model, service, filter pipe
  documents/  Document feature and management
  messages/   Message feature
  shared/     Layout, navigation, shared components and directives
server/       Node/Express backend API
```

## Getting Started

Prerequisites: Node.js and npm, plus a running MongoDB instance. Install dependencies with `npm install`. Start the backend with `node server.js`, then start the development server with `ng serve` and open http://localhost:4200/. The app reloads automatically on source changes. Build the project with `ng build` (artifacts are output to the `dist/` directory) and run unit tests with `ng test` using the Karma test runner.
