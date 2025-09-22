# NeoType - Futuristic Typing Practice Website

A sleek, cyberpunk-themed typing practice application built with React, TypeScript, and Tailwind CSS. Perfect your typing skills with advanced training modes and real-time performance tracking.

![NeoType Screenshot](https://i.ibb.co/KcGFz4Jj/Screenshot-2025-09-22-235752.png]) 

## ✨ Features

### 🎯 **Multiple Practice Modes**
- **Normal Mode**: Practice with all keyboard keys for comprehensive typing improvement
- **Left Hand Mode**: Focus exclusively on left-hand keys (Q, W, E, R, T, A, S, D, F, G, Z, X, C, V, B)
- **Right Hand Mode**: Train specifically with right-hand keys (Y, U, I, O, P, H, J, K, L, N, M)

### ⏱️ **Flexible Test Configuration**
- **Time-based Tests**: Choose from 15s, 30s, 60s, or set a custom duration
- **Word-based Tests**: Practice with specific word counts (10, 25, 50, 100, or custom)
- **Smart Word Generation**: Contextually generated words based on selected hand mode

### 📊 **Real-time Performance Tracking**
- **Live WPM (Words Per Minute)**: See your typing speed update in real-time
- **Accuracy Percentage**: Track your precision as you type
- **Progress Visualization**: Beautiful progress bars and visual indicators
- **Error Tracking**: Monitor mistakes to identify areas for improvement

### 🎨 **Futuristic UI/UX**
- **Cyberpunk Theme**: Neon accents and glowing effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smart Word Display**: Completed words stay visible, current word highlighted
- **Smooth Animations**: Fluid transitions and visual feedback
- **Dark Mode Optimized**: Easy on the eyes for extended practice sessions

### 📈 **Detailed Results Analysis**
- **Comprehensive Statistics**: WPM, accuracy, total words typed, errors
- **Performance Insights**: Detailed breakdown of your typing session
- **Improvement Tips**: Actionable suggestions based on your performance
- **Session History**: Track your progress over time

### 🎯 **User Experience Features**
- **Auto-focus Input**: Seamless typing experience without manual clicking
- **Visual Word Feedback**: Color-coded word states (completed, current, upcoming)
- **Keyboard Shortcuts**: Quick access to restart and settings
- **Accessible Design**: Screen reader friendly and keyboard navigable

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:5173
   ```

### Building for Production
```bash
npm run build
npm run preview
```

## 🎮 How to Use

1. **Choose Your Mode**: Select Normal, Left Hand, or Right Hand practice mode
2. **Set Test Parameters**: Pick time-based (15s-60s) or word-based (10-100 words) testing
3. **Start Typing**: Begin typing the displayed words - the test starts automatically
4. **Track Progress**: Monitor your WPM, accuracy, and progress in real-time
5. **Review Results**: Analyze your performance and get improvement suggestions
6. **Practice Again**: Use insights to focus on weak areas and improve

## 🛠️ Technology Stack

This project is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Lucide React for beautiful, consistent iconography
- **Animations**: Tailwind CSS animations with custom transitions

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── TypingPractice.tsx    # Main typing practice logic
│   ├── TypingDisplay.tsx     # Word display and input handling
│   ├── TypingSettings.tsx    # Test configuration interface
│   └── TypingResults.tsx     # Results and statistics display
├── lib/                # Utility functions and helpers
│   ├── wordGenerator.ts      # Smart word generation logic
│   └── utils.ts             # Common utility functions
├── pages/              # Application pages
└── hooks/              # Custom React hooks
```

## 🎨 Customization

### Theme Customization
The app uses a sophisticated design system defined in:
- `src/index.css` - CSS custom properties and global styles
- `tailwind.config.ts` - Tailwind configuration and theme extensions

### Adding New Features
The modular architecture makes it easy to extend:
- **New Practice Modes**: Extend the `TypingMode` type and update word generation
- **Custom Word Lists**: Modify `wordGenerator.ts` to include specialized vocabularies
- **Additional Metrics**: Enhance `TypingStats` interface and calculation logic

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Ensure responsive design compatibility
- Test across different browsers and devices

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

**Created with ❤️ by [eclractic](https://github.com/eclractic)**

Special thanks to:
- The React and TypeScript communities
- Shadcn for the excellent UI component library
- Tailwind CSS for the utility-first styling approach
- Lucide for the beautiful icon library

---
s
