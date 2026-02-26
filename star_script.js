  const starsContainer = document.querySelector('.stars');
  const numStars = 60;
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.pow(Math.random(), 3) * 130 + 1;
    const opacity = Math.random() * 0.05 + 0.005;

    star.style.setProperty('--max-opacity', opacity);
    star.style.opacity = 0;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    const duration = 10 + Math.random() * 30;
    const delay = Math.random() * 2;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    //star.style.backgroundColor = `hsl(${Math.random() * 255}, ${Math.random() * 100}%, ${Math.random() * 100}%)`;

    starsContainer.appendChild(star);

    stars.push({
      element: star,
      x,
      y,
      dx: (Math.random() - 0.5) * 0.03,
      dy: (Math.random() - 0.5) * 0.03
    });
  }

  function animateStars() {
    for (const star of stars) {
      star.x += star.dx;
      star.y += star.dy;

      if (star.x < star.size * -1) star.x = 100 + star.size;
      else if (star.x > 100 + star.size) star.x = star.size * -1;

      if (star.y < star.size * -1) star.y = 100 + star.size;
      else if (star.y > 100 + star.size) star.y = star.size * -1;

      star.element.style.left = `${star.x}%`;
      star.element.style.top = `${star.y}%`;
    }
    requestAnimationFrame(animateStars);
  }

  animateStars();