const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const project = projects.find(p => p.slug === slug);

    if (!project) {
      document.getElementById('project').innerHTML = '<h1>Project not found</h1>';
      return;
    }

    const linksHTML = project.links
      ? Object.entries(project.links)
          .map(([label, url]) =>
            `<a href="${url}" target="_blank" rel="noopener" class="project-link">
              ${label}
            </a>`
          )
          .join('')
      : '';

    const imagesHTML = project.images
      ? project.images
          .map(image => `<img src="${encodeURI(image)}" class="image">`)
          .join('')
      : '';

    const tagsHTML = project.tags
      ? project.tags
          .map(tag =>
            `<a href="index.html?search=${encodeURIComponent(tag)}" class="tag">
              ${tag}
            </a>`
          )
          .join('')
      : '';

    document.title = project.name;

    document.getElementById('project').innerHTML = `
      <h1>${project.name}</h1>

      <div class="tags">${tagsHTML}</div>

      <div class="slideshow">
        <button class="arrow left">‹</button>

          <div class="images">
            ${imagesHTML}
          </div>

        <button class="arrow right">›</button>
      </div>

      <div class="project-links">${linksHTML}</div>
      <p class="project-desc">${project.text}</p>
    `;

    const images = document.querySelectorAll('.images img');
    const container = document.querySelector('.images');
    let index = 0;

    function updateSlideshow() {
      if (!images.length) return;

      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });

      const viewport = container.parentElement;
      const viewportWidth = viewport.offsetWidth;
      const imageWidth = images[0].offsetWidth;
      const gap = 10;
      const offset = (viewportWidth / 2) - (imageWidth / 2) - (index * (imageWidth + gap));

      container.style.transform = `translateX(${offset}px)`;
    }

    document.querySelector('.arrow.left').addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      updateSlideshow();
    });

    document.querySelector('.arrow.right').addEventListener('click', () => {
      index = (index + 1) % images.length;
      updateSlideshow();
    });

    const imageArray = Array.from(images);
    if (imageArray.length) {
      Promise.all(
        imageArray.map(img => img.complete ? Promise.resolve() : new Promise(r => img.onload = r))
      ).then(updateSlideshow);
    }
  });