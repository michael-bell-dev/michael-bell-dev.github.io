fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects');

    projects.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('project');

      div.innerHTML = `
        <img src="${p.thumbnail}" alt="${p.name}">
        <div class="project-text">
          <h2>${p.name}</h2>
          <p>${p.date}</p>
          <p>${p.description}</p>
          <p>
            <!-- <strong>Tags:</strong> -->
            ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
          </p>
        </div>
      `;

      container.appendChild(div);
    });
  });