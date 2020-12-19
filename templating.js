const fs = require("fs");
const path = require("path");

const generate = (gramFile) => (newFile = null) => (keywords) => {
  let content = fs.readFileSync(path.join(__dirname, gramFile), "utf-8");
  for (let keyword in keywords) {
    let newContent = content.replaceAll(
      `\__${keyword}__/`,
      keywords[keyword].join("\n")
    );
    if (content === newContent) {
      console.log(`Keyword "${keyword}" not found.`);
    }
    content = newContent;
  }
  let newPath = newFile ?? gramFile.replace("gram", "txt");
  fs.writeFileSync(path.join(__dirname, newPath), content);
  console.log(newPath + " generated");
};

const genFile = generate("./file.gram")("./file.txt");

const vars = [
  ["test", 5],
  ["boh", 8],
  ["roger", 21],
].map((e) => `let ${e[0]} = ${e[1]}`);

const imports = ["axios", "supermodule"].map((m) => `import ${m} from ${m}`);

const gramsco = `Gramsco (le qoqo)\n`;
const year = `© ${new Date().getFullYear()}\n`;
const readme = "Nothing yet\n";
const ending = "– –\n";

const keywords = {
  prez: [gramsco, year, readme, ending],
};

genFile(keywords);
