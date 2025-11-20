fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects');

    projects.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('project');

      div.innerHTML = `
        <h2>${p.name}</h2>
        <img src="${p.thumbnail}" alt="${p.name}">
        <p>${p.description}</p>
        <p><strong>Tags:</strong> ${p.tags.join(', ')}</p>
      `;

      container.appendChild(div);
    });
  });