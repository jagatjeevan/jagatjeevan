function Changelog() {
  const repoOwner = 'facebook';
  const repoName = 'react';

  async function fetchReleases() {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases`);
    const releases = await response.json();
    const changelogDiv = document.getElementById('changelog');

    releases.forEach((release) => {
      const releaseDiv = document.createElement('div');
      releaseDiv.innerHTML = `
            <h2>${release.name} - ${new Date(release.published_at).toLocaleDateString()}</h2>
            <p>${release.body}</p>
          `;
      changelogDiv.appendChild(releaseDiv);
    });
  }

  fetchReleases();

  return (
    <>
      <h1>Changelog</h1>
      <h3>Reference : https://github.com/facebook/react/releases</h3>
      <div id="changelog"></div>
    </>
  );
}

export default Changelog;
