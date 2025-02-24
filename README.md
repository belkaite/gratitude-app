# Gratitude App

## About

Gratitude is a scientifically proven thing that helps improve well being. Instead of writing in a physical journal, decided to create a digital version of gratitude journal.

This project was also inspired by the channel Kurzgesagt, which published a paper notebook for practicing gratitude.

This app tries to make gratitude journaling more engaging and motivating for end users.

## Features and functionality

### User authentication and progression

- Users can sign up, log in and change their password.
- After creating a profile, users start at Level 1.
- The app currently has 3 levels.
- Users progress to the next level after submitting 15 gratitude notes.
- The highest level at this stage is Level 3, user stays in level 3.

### Guided gratitude

- Each level provides different sets of questions to help users develop a gratitude habit.
- The questions are more specific and basic at Level 1 and gradually become more open ended at Level 3.

### Motivational and educational elements

- To keep users engaged and show that gratitude has real benefits, the app provides a scientific tip every 5 submitted notes.
- Users receive AI-generated reflections from OpenAI based on their latest gratitude entry.

### Gratitude notes (CRUD)

Users can create, read, update and delete their gratitude journal entries.

## How to Use the App

1. Sign up and log in.
2. Fetch the gratitude questions for your level.
3. Submit your gratitude note based on the given questions.
4. Progress through levels and receive motivational insights as you journal.

## Techn stack

- Backend: tRPC API, TypeScript, Node.js, Kysely, PostgreSQL, OpenAI API

### Database schema

Currently schema: https://dbdiagram.io/d/677acf905406798ef754976e

## Setup

1. `npm install`
2. Create a PostgreSQL database
3. Setup `.env` files in `client` and `server` based on `.env.example` files.

## Running the project in development

```bash
# automatically restarts the server
npm run dev -w server

```

## Tests

```bash

# back end tests
npm test -w server
```

## Migrations

```bash

# migrate up to the latest migration
npm run migrate:latest -w server

# generate types
npm run gen:types -w server
```

## TRPC panel

You can test backend functionality through the tRPC panel:
http://localhost:3000/api/v1/trpc-panel
