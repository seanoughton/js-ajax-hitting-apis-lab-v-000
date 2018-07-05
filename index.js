function getRepositories() {
  let user = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  //need to put user into the open url
  req.open("GET", `https://api.github.com/users/${user}/repos`)
  req.send()
}

function showRepositories(event, data) {
  //The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).
  //need three things username, repository name, repository url
  var repos = JSON.parse(this.responseText)
  //console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' +
  '<p>Repository Name: ' + r.name +  `<p><a href="${r.html_url}">Github Link</a></p></p>` +
  'User Name: ' + r.owner.login +
  ' <a href="#" data-repository="' + r.name + '"data-username="'+ r.owner.login +'" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository
  const owner = el.dataset.username//"seanoughton"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + owner + '/' + name + '/commits')
  req.send()
}

//The display of commits should include the author's Github name, the author's full name, and the commit message.
function displayCommits() {
  //turns this into a json object
  const commits = JSON.parse(this.responseText)
  console.log(commits);
// creates the html by going through the commits collection and pulling out the data needed and putting it into a li
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  //gets the DOM element and puts the commitsList html into the div
  document.getElementById("details").innerHTML = commitsList
}
