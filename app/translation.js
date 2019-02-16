const request = require("request");

function getClosedDiv(markup, index) {
  const tmp = markup.slice(index, markup.length);
  offset = tmp.indexOf("</div>");
  const val = index + offset;
  return val;
}

function getTranslationDiv(markup) {
  const index = markup.indexOf("translation_he heTrans");
  const startContent = markup.indexOf(">", index);
  const divElement = markup
    .substring(startContent + 1, getClosedDiv(markup, index))
    .trim();
  return divElement;
}

function getPromise(word) {
  let promise1 = new Promise(function(resolve, reject) {
    request(`http://www.morfix.co.il/${word}`, function(error, response, body) {
      const trans = getTranslationDiv(body);
      resolve(trans);
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    });
  });
  return promise1;
}

function parseHttpReq(word) {
  let p = getPromise(word);
  p.then(function(value) {
    return value;
  });
}

// router.get("/:word", parseHttpReq, function(req, res) {
//   const { word } = req.params;
//   console.log(`searching for: ${word}`);
//   res.setHeader("Content-Type", "application/json");
//   res.json({ morfix_trans: req.value });
// });

function translate(word) {
  return parseHttpReq(word);
}

module.exports = getPromise;
// module.exports = translate;
