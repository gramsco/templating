const axios = require("axios");

const getUserRepos = (user) => (page) => {
  return axios
    .get(`https://api.github.com/users/${user}/repos?page=${page}&per_page=5`)
    .then((res) => {
      return `Page ${page}
${JSON.stringify(
  res.data.map((e) => e.name),
  null,
  2
)}`;
    });
};

const user = "gramsco";

const getUserData = getUserRepos(user);

const allGen = {};

for (let i = 1; i < 10; i++) {
  let keyword = `page${i}`;
  allGen[keyword] = () => getUserData(i);
}

module.exports = {
  gramsco: `by @${user}`,
  ending: `© ${new Date().getFullYear()}`,
  blank: "\n".repeat(10),
  // ...allGen,
};
