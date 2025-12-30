let animate = true;

fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects');
    const pagination = document.getElementById('pagination');
    const searchInput = document.getElementById('search');

    const itemsPerPage = 5;
    let currentPage = 1;
    let filtered = projects;

    function renderPage(page) {
      container.innerHTML = "";

      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pageItems = filtered.slice(start, end);

      pageItems.forEach(p => {
        const div = document.createElement('a');
        div.classList.add('project');
        div.href = `project.html?slug=${p.slug}`;

        div.innerHTML = `
          <img src="${p.thumbnail}" alt="${p.name}">
          <div class="project-text">
            <div class="project-header">
              <h2>${p.name}</h2>
              <span class="project-date">${p.date}</span>
            </div>

            ${p.description}
            <p>${p.tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join(' ')}</p>
          </div>
        `;

        container.appendChild(div);

          if (animate) {
            requestAnimationFrame(() => div.classList.add('show'));
          } else {
            div.classList.add('show');
          }

          div.querySelectorAll('.tag').forEach(tagEl => {
            tagEl.addEventListener('click', () => {
              const tag = tagEl.dataset.tag.toLowerCase();

              searchInput.value = tag;
              animate = false;
              filtered = projects.filter(p =>
                p.tags.some(t => t.toLowerCase() === tag)
              );

              currentPage = 1;
              renderPage(currentPage);

              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            });
          });
      });

      renderPagination();
    }

    function renderPagination() {
      pagination.innerHTML = "";
      const totalPages = Math.ceil(filtered.length / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('page-btn');

        if (i === currentPage) btn.classList.add('active');

        btn.addEventListener('click', () => {
          currentPage = i;
          animate = true;
          renderPage(currentPage);

          window.scrollTo({
            //top: searchInput.offsetTop,
            top: 0,
            behavior: 'smooth'
          });
        });

        pagination.appendChild(btn);
      }
    }

    function applySearch() {
      animate = false;
      const q = searchInput.value.toLowerCase();

      filtered = projects.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );

      currentPage = 1;
      renderPage(currentPage);
    }

    searchInput.addEventListener('input', applySearch);

    renderPage(currentPage);
  });