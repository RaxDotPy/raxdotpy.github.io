# 🏓 Pong Game

A classic Pong game built with HTML5, CSS3, and JavaScript. Play against an AI opponent with smooth controls and realistic ball physics.

## 🎮 Features

- ✅ **Bouncing Ball** - Physics-based movement with wall collision detection
- ✅ **Collision Detection** - Accurate paddle and wall collisions with ball spin
- ✅ **Scoreboard** - Real-time score tracking for player and computer
- ✅ **Dual Paddle Controls** - Mouse movement and arrow keys support
- ✅ **AI Opponent** - Intelligent computer paddle with ball-tracking behavior
- ✅ **Modern Design** - Neon theme with smooth animations

## 🕹️ Controls

### Player Paddle (Left - Green)
- **Mouse**: Move your cursor up/down to control the paddle
- **Arrow Keys**: Use ⬆️ Up and ⬇️ Down arrows for alternative control

### Computer Paddle (Right - Red)
- Automatically controlled by intelligent AI

## 🚀 How to Play

1. Open `index.html` in your web browser
2. Move your paddle to hit the yellow ball
3. Don't let the ball pass your paddle!
4. Score when the opponent fails to hit the ball
5. First to reach your target score wins!

## 📁 File Structure

```
pong-game/
├── index.html      # Game HTML structure
├── style.css       # Game styling and theme
├── script.js       # Game logic and physics
└── README.md       # This file
```

## 🎯 Game Mechanics

### Ball Physics
- Bounces off top and bottom walls
- Bounces off both paddles with spin effects
- Speed increases gradually during gameplay
- Direction changes based on where it hits the paddle

### AI Opponent
- Tracks the ball's position
- Responds with realistic reaction time
- Not unbeatable - allows for competitive gameplay

### Scoring
- Player scores when ball passes computer paddle
- Computer scores when ball passes player paddle
- Ball resets to center after each point

## 💻 Technical Details

- **Game Loop**: Uses `requestAnimationFrame` for smooth 60 FPS gameplay
- **Canvas Rendering**: HTML5 Canvas API for graphics
- **Event Handling**: Keyboard and mouse input detection
- **Collision Detection**: Rectangle and circle collision algorithms

## 🌐 Play Online

Visit: [Pong Game](https://raxdotpy.github.io/pong-game/)

## 📝 License

Free to use and modify. Enjoy! 🎮
