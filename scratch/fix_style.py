filepath = '/Users/batman/Desktop/techfittech/public/assets/style.css'
with open(filepath, 'a', encoding='utf-8') as f:
    f.write('''

/* =========================================================================
   A11Y & PERFORMANCE (Antigravity Fixes)
   ========================================================================= */

/* P3-4: Keyboard a11y focus */
:focus-visible {
  outline: 3px solid var(--brand-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
.pillar:focus-visible, .btn:focus-visible, a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: 3px solid var(--brand-primary);
}
.pillar {
  cursor: pointer;
}

/* P2-4: Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
''')

print("style.css appended!")
