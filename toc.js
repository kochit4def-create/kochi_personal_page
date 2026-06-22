const chapters = [
  {
    id: 'ch1', number: '1', title: 'Introduction', children: [
      { id: 'ch1-1', number: '1.1', title: 'Modelling of soil' },
      { id: 'ch1-2', number: '1.2', title: 'Formation history and informative indices of organic soil' }
    ]
  },
  {
    id: 'ch2', number: '2', title: 'Stress and strain measures', children: [
      { id: 'ch2-1', number: '2.1', title: 'Stress and strain tensor' },
      { id: 'ch2-2', number: '2.2', title: 'Principal stress and strain' }
    ]
  },
  {
    id: 'ch3', number: '3', title: 'Some constitutive approaches', children: [
      { id: 'ch3-1', number: '3.1', title: 'Elasticity', children: [
        { id: 'ch3-1-1', number: '3.1.1', title: 'Cross-anisotropy' },
        { id: 'ch3-1-2', number: '3.1.2', title: 'Calibration of the anisotropic parameters from triaxial data', unavailable: true },
        { id: 'ch3-1-3', number: '3.1.3', title: 'Hysteretic (nonlinear) elasticity', unavailable: true }
      ] },
      { id: 'ch3-2', number: '3.2', title: 'Elasto-plasticity', children: [
        { id: 'ch3-2-1', number: '3.2.1', title: 'Compressibility' },
        { id: 'ch3-2-2', number: '3.2.2', title: 'Shear failure', unavailable: true },
        { id: 'ch3-2-3', number: '3.2.3', title: 'General concept for yielding' },
        { id: 'ch3-2-4', number: '3.2.4', title: 'Cam-Clay model' },
        { id: 'ch3-2-5', number: '3.2.5', title: 'Induced anisotropy', unavailable: true }
      ] },
      { id: 'ch3-3', number: '3.3', title: 'Time-dependent deformation', children: [
        { id: 'ch3-3-1', number: '3.3.1', title: 'Primary consolidation' },
        { id: 'ch3-3-2', number: '3.3.2', title: 'Secondary consolidation and isotach concept' }
      ] },
      { id: 'ch3-4', number: '3.4', title: 'Temperature-dependent deformation', unavailable: true, children: [
        { id: 'ch3-4-1', number: '3.4.1', title: 'Experimental findings and isothermal isotach concept', unavailable: true },
        { id: 'ch3-4-2', number: '3.4.2', title: 'Formulation', unavailable: true }
      ] }
    ]
  }
];

const pageSequence = [
  { id: 'index', title: 'Home' },
  { id: 'ch1', title: 'Ch1' },
  { id: 'ch1-1', title: 'Ch1.1' },
  { id: 'ch1-2', title: 'Ch1.2' },
  { id: 'ch2', title: 'Ch2' },
  { id: 'ch2-1', title: 'Ch2.1' },
  { id: 'ch2-2', title: 'Ch2.2' },
  { id: 'ch3', title: 'Ch3' },
  { id: 'ch3-1-1', title: 'Ch3.1.1' },
  { id: 'ch3-2-1', title: 'Ch3.2.1' },
  { id: 'ch3-2-3', title: 'Ch3.2.3' },
  { id: 'ch3-2-4', title: 'Ch3.2.4' },
  { id: 'ch3-3-1', title: 'Ch3.3.1' },
  { id: 'ch3-3-2', title: 'Ch3.3.2' },
  { id: 'references', title: 'References' }
];

function containsId(item, id) {
  return item.id === id || (item.children && item.children.some((child) => containsId(child, id)));
}

function link(item, current) {
  if (item.unavailable) {
    return `<span class="toc-unavailable" aria-disabled="true"><span class="toc-number">Ch.${item.number}</span><span class="toc-title">${item.title}</span></span>`;
  }
  const active = containsId(item, current) ? ' class="active" aria-current="page"' : '';
  return `<a href="${item.id}.html"${active}><span class="toc-number">Ch.${item.number}</span><span class="toc-title">${item.title}</span></a>`;
}

const sidebar = document.querySelector('.sidebar[data-current]');
if (sidebar) {
  const current = sidebar.dataset.current;
  sidebar.innerHTML = `
    <nav class="toc" aria-label="Table of contents">
      <a href="index.html"${current === 'index' ? ' class="active" aria-current="page"' : ''}>Home</a>
      ${chapters.map((chapter) => link(chapter, current)).join('')}
      <a href="references.html"${current === 'references' ? ' class="active" aria-current="page"' : ''}>References</a>
    </nav>
    <p class="sidebar-footer">© 2026 Taishi Kochi.<br>All rights reserved.</p>`;

  const currentIndex = pageSequence.findIndex((page) => page.id === current);
  const previous = pageSequence[currentIndex - 1];
  const next = pageSequence[currentIndex + 1];
  const content = document.querySelector('main.content');

  if (content && currentIndex !== -1) {
    const navigation = document.createElement('nav');
    navigation.className = 'nav-buttons';
    navigation.setAttribute('aria-label', 'Page navigation');
    if (previous) navigation.insertAdjacentHTML('beforeend', `<a class="btn" href="${previous.id}.html">Back: ${previous.title}</a>`);
    if (next) navigation.insertAdjacentHTML('beforeend', `<a class="btn primary" href="${next.id}.html">Next: ${next.title}</a>`);
    content.append(navigation);
  }
}
