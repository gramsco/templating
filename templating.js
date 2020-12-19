const fs = require("fs");
const path = require("path");
const keywords = require("./gramrc");

fs.readFileSync("file.txt");

async function getReplaceWith(entry) {
  let isArray = Array.isArray(entry);
  if (isArray) return entry.join("\n");

  let isFn = typeof entry === "function";
  if (isFn) {
    let r = await entry();
    return r;
  } else return entry;
}

const generate = (gramFile) => (newFile = null) => async (keywords) => {
  let content = fs.readFileSync(path.join(__dirname, gramFile), "utf-8");
  for (let keyword in keywords) {
    let token = `=${keyword}=`;

    let replaceWith = await getReplaceWith(keywords[keyword]);

    let newContent = content.replaceAll(token, replaceWith);

    if (content === newContent) {
      console.log(` => Keyword "${keyword}" not found.`);
    }
    content = newContent;
  }
  let newPath = newFile ?? gramFile.replace("gram", "txt");
  fs.writeFileSync(path.join(__dirname, newPath), content);

  console.log("\n" + content);
};

const genFile = generate("./file.txt")("./file.txt");

const vars = [
  ["test", 5],
  ["boh", 8],
  ["roger", 21],
].map((e) => `let ${e[0]} = ${e[1]}`);

const imports = ["axios", "supermodule"].map((m) => `import ${m} from ${m}`);

genFile(keywords);
