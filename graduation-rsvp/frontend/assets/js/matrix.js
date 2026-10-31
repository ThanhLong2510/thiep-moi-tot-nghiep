/**
 * matrix.js
 * Celestial Sapphire Graduation Starlight Background
 * Features:
 * - Graduation & Celebration symbols: 🎓, 📜, ✨, 💙, ⭐, 🎉, 💫, 🕊️
 * - Royal Sapphire & Azure shimmering trails with glowing stars
 * - Non-intrusive subtle luxury backdrop ensuring crisp card readability
 * - Fully responsive with Retina / mobile performance optimization
 */

(function () {
  'use strict';

  const CHARACTERS = ['🎓', '📜', '✨', '💙', '⭐', '🎉', '💫', '🕊️'];
  
  // Royal Sapphire & Azure accent colors for the trailing glow & highlights
  const ACCENT_COLORS = [
    { text: '#2563eb', glow: 'rgba(37, 99, 235, 0.45)' }, // Royal Sapphire Blue
    { text: '#38bdf8', glow: 'rgba(56, 189, 248, 0.45)' }, // Electric Azure
    { text: '#60a5fa', glow: 'rgba(96, 165, 250, 0.40)' }, // Soft Blue
    { text: '#fbbf24', glow: 'rgba(251, 191, 36, 0.35)' }, // Royal Gold
    { text: '#93c5fd', glow: 'rgba(147, 197, 253, 0.35)' } // Ice Azure
  ];

  class MatrixRain {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.columns = [];
      this.fontSize = 26;
      this.columnWidth = 34;
      this.isRunning = false;
      this.rafId = null;
      this.lastFrameTime = 0;
      this.targetFps = 35; // Smooth yet battery-friendly frame rate
      this.frameInterval = 1000 / this.targetFps;

      this.init();
    }

    init() {
      this.resize();
      this.setupColumns();
      this.bindEvents();
      this.start();
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;

      this.ctx.scale(dpr, dpr);

      // Adjust column spacing based on device width
      if (this.width < 640) {
        this.fontSize = 20;
        this.columnWidth = 28;
      } else if (this.width < 1024) {
        this.fontSize = 22;
        this.columnWidth = 30;
      } else {
        this.fontSize = 26;
        this.columnWidth = 36;
      }

      this.numColumns = Math.floor(this.width / this.columnWidth);
    }

    setupColumns() {
      this.columns = [];
      for (let i = 0; i < this.numColumns; i++) {
        const colorObj = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
        this.columns.push({
          x: i * this.columnWidth + (this.columnWidth - this.fontSize) / 2,
          y: Math.random() * -this.height, // Stagger initial start positions
          speed: 1.0 + Math.random() * 2.0, // Graceful falling speed
          char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
          opacity: 0.14 + Math.random() * 0.36, // Subtle opacity to keep text clear
          glowColor: colorObj.glow,
          textColor: colorObj.text,
          changeCounter: Math.floor(Math.random() * 20),
          step: Math.floor(Math.random() * 8)
        });
      }
    }

    bindEvents() {
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.resize();
          this.setupColumns();
        }, 150);
      });

      // Pause when tab not visible to save CPU/battery
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });
    }

    render(timestamp) {
      if (!this.isRunning) return;

      const elapsed = timestamp - this.lastFrameTime;
      if (elapsed > this.frameInterval) {
        this.lastFrameTime = timestamp - (elapsed % this.frameInterval);

        // Fading trail effect tailored for Royal Blue Light / Dark themes
        const isLight = document.documentElement.getAttribute('data-theme') !== 'dark' && !document.body.classList.contains('theme-dark');
        this.ctx.fillStyle = isLight ? 'rgba(240, 247, 255, 0.22)' : 'rgba(6, 11, 24, 0.20)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.font = `${this.fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (let i = 0; i < this.columns.length; i++) {
          const col = this.columns[i];

          // Periodically mutate character
          col.changeCounter++;
          if (col.changeCounter > 18) {
            col.char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            col.changeCounter = 0;
          }

          // Render subtle sapphire starlight glow around character
          this.ctx.save();
          this.ctx.globalAlpha = col.opacity;
          this.ctx.shadowColor = col.glowColor;
          this.ctx.shadowBlur = 10;
          
          this.ctx.fillText(col.char, col.x, col.y);
          this.ctx.restore();

          // Advance position
          col.y += col.speed * 3.6;

          // Reset when drop falls beyond the screen
          if (col.y > this.height + 40) {
            col.y = -30 - Math.random() * 60;
            col.speed = 0.9 + Math.random() * 2.0;
            col.opacity = 0.14 + Math.random() * 0.36;
            col.char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            const colorObj = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
            col.glowColor = colorObj.glow;
            col.textColor = colorObj.text;
          }
        }
      }

      this.rafId = requestAnimationFrame((t) => this.render(t));
    }

    start() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.lastFrameTime = performance.now();
        this.rafId = requestAnimationFrame((t) => this.render(t));
      }
    }

    stop() {
      this.isRunning = false;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    }
  }

  // Expose globally
  window.MatrixRain = MatrixRain;
})();
