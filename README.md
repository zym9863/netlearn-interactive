# NetLearn Interactive

[English](README.md) | [中文](README_zh.md)

An interactive web application for learning and visualizing network protocols through simulations and interactive examples.

## Overview

NetLearn Interactive helps users understand fundamental network protocols through visual demonstrations and interactive simulations. The application covers three core protocols:

- **TCP Protocol**: Visualize the TCP three-way handshake and four-way termination processes
- **HTTP Protocol**: Understand HTTP request and response flow with interactive examples
- **DNS Protocol**: Learn how domain names are resolved through the DNS query process

## Technologies Used

- React 19
- TypeScript
- Vite
- React Router
- Styled Components
- Framer Motion
- React Icons

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zym9863/netlearn-interactive.git
   cd netlearn-interactive
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Build for production:
   ```bash
   npm run build
   ```

3. Preview the production build:
   ```bash
   npm run preview
   ```

## Features

- **Interactive Visualizations**: Dynamic animations that illustrate how network protocols function
- **Protocol Simulations**: Step-by-step walkthroughs of protocol operations
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## Project Structure

```
src/
├── assets/       # Static assets like images
├── components/   # Reusable UI components
├── pages/        # Page components for each route
│   ├── HomePage.tsx
│   ├── TCPPage.tsx
│   ├── HTTPPage.tsx
│   └── DNSPage.tsx
├── styles/       # Global styles and theme
└── utils/        # Utility functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
