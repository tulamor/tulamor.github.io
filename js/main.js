const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
const searchStates = async searchText => {
  const res = await fetch('../data/data.json');
  const states = await res.json();

  //Get matches to current text input
  let matches = states.filter(state => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return state.name.match(regex) || state.package_type.match(regex);
  });


  // "hashtag": "dd894912571b8cd046255b897c5190d7", 
  // "name": "OpenBLAS-toolfile", 
  // "package_type": "external", 
  // "ver_suffix": "1.0-bcolbf"

  if (searchText.lenght === 0) {
    mathes = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches)
};

// Show results in HTML
const outputHtml = matches => {
  if(matches.length > 0) {
    const html = matches.map(match => `
      <div class="card card-body mb-1">
        <h5 class="text-primary">${match.name}</h5>
        <h5>${match.package_type}</h5>
        <medium>${match.ver_suffix} <br> ${match.hashtag}</small>
      </div>
    `
    )
    .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchStates(search.value))
;
