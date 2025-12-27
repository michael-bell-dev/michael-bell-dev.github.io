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

    document.title = project.name;

    document.getElementById('project').innerHTML = `
    
      <h1>${project.name}</h1>

      <div class="project-links">
        ${linksHTML}
      </div>
      
      <p class="project-text">${project.text}</p>
    `;
  });