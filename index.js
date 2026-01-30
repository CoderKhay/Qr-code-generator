const inquirer = require("inquirer");
const qr = require("qr-image");
const { createWriteStream, writeFile } = require("fs");

console.log("This is gonna be lit");
console.log(inquirer);

inquirer
  .prompt([
    {
      type: "input",
      name: "URL",
      message: "Please enter your link to generate an image of it:",
    },
    {
      name: "webName",
      message: "What website does your link take you too ?",
    },
  ])
  .then(({ URL, webName }) => {
    const qrImage = qr.image(URL, { type: "png" });
    const saveWebName = webName;
    const storeQr = qrImage.pipe(createWriteStream(`${saveWebName}.png`));
    console.log(storeQr);

    writeFile(`${saveWebName}.txt`, URL, (err) => {
      if (err) throw err;
      console.log("File saved successfully");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("This is a wrong environment");
    } else {
      console.log("something else went wrong :", error);
    }
  });
