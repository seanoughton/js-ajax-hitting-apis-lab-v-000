function getRepositories() {
  let user = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  //need to put user into the open url
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function showRepositories(event, data) {
  //The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).
  var repos = JSON.parse(this.responseText)// JSON.parse  parses a JSON string, constructing the JavaScript value or object described by the string.
  //console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
