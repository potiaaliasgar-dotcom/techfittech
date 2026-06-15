import os

css_path = '/Users/batman/Desktop/techfittech/public/assets/style.css'
with open(css_path, 'a', encoding='utf-8') as f:
    f.write("""

/* --- Micro-Animations --- */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: opacity, transform;
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
""")
print("Appended .reveal to style.css")
