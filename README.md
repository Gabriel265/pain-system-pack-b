# Websiste UI

UI Scafolld
---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features & Structure](#features--structure)
  - [Public Website](#public-website)
  - [Portal (Authentication) Section](#portal-authentication-section)
  - [VST Application Section](#vst-application-section)
  - [Folder Structure (Visualized)](#folder-structure-visualized)
  - [Design Theme](#design-theme)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Development](#development)
- [Build & Run (Production)](#build-run-production)
- [Testing](#testing)
- [Deployment](#deployment)

---

## Overview

The dummy web application is implemented according to Phase 1 requirements. It includes:

- Placeholder pages, navigation flows, layouts, and a clean folder structure
- A neutral theme (black, white, orange accents)
- Distinct sections for Public Website, Portal (authentication), and VST application areas

Key notes:
- No real backend calls or data handling in placeholder sections
- Static routing for the Portal Dashboard
- All components currently use structural placeholder blocks

---

## Tech Stack

- Next.js 16
- React 19+ (App Router)
- Styling: CSS Modules / Tailwind CSS / Styled Components 
- Node.js
- npm or yarn

---

## Features & Structure

### Public Website

- Header with navigation:
  - Home
  - About
  - Contact
  - Services
  - Portal (button)
  - VST App (button)
- Footer (consistent navigation)
- Homepage sections:
  - Hero
  - About
  - Services preview
  - Contact
  - Optional testimonial (toggle as needed)

### Portal Authentication Section

- Entry point: Portal button navigates to login
- Authentication placeholders:
  - Login
  - Signup
  - Forgot Password
  - (Note: No real authentication logic yet)
- Portal Dashboard (static routing):
  - Sidebar navigation:
    - Dashboard
    - My Projects
    - Notifications
    - Builder
    - Logout (returns to login)

### VST Application Section

- Entry via VST App button
- VST home with a sidebar to:
  - VST Home
  - Search
  - Results
  - Map
  - Safety
- No API calls or data handling in this stage

### Folder Structure (Visualized)

- src/
  - app/
    - (auth)/
      - login/page.js
      - signup/page.js
      - forgot-password/page.js
    - about/page.js
    - contact/page.js
    - services/page.js
    - portal/
      - dashboard/page.js
      - builder/page.js
      - my-projects/page.js
      - notifications/page.js
      - logout/page.js
    - vst/
      - home/page.js
      - search/page.js
      - results/page.js
      - map/page.js
      - safety/page.js
  - components/
    - common/
      - Footer.js
      - Header.js
      - Sidebar.js
      - ThemeToggle.js
    - dashboard/
      - (dashboard components)
    - sections/
      - AboutSection.jsx
      - ContactSection.jsx
      - Hero.jsx
      - MeetTeam.jsx
      - ServicesOffering.jsx
      - Testimonial.js
  - assets/

### Design Theme

- Neutral, generic look:
  - Base colors: black + white
  - Accent color: orange for interactive elements (buttons, highlights)
- Provides a clean, modern appearance that can be easily adapted to a specific use case

---

## Getting Started

### Prerequisites

- Node.js (>= 14.x; or as required by your project)
- npm or yarn
- Git

### Installation

```bash  
# clone the repository  
git clone https://github.com/Gabriel265/thepainsystem.git  
cd thepainsystem  

# install dependencies  
npm install  
# or  
yarn install 


# start in development mode (hot-reload)
npm run dev
# or
yarn dev


# build for production
npm run build
# start the production server
npm run start