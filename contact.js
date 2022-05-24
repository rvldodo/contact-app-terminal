const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

const loadData = () => {
  // read file
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};

const saveContact = (id, name, email, phoneNumber) => {
  const contact = { id, name, email, phoneNumber };

  const contacts = loadData();
  // check duplicate
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(chalk.red.inverse.bold(`Contact already exists`));
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold(`Email not valid`));
      return false;
    }
  }

  if (!validator.isMobilePhone(phoneNumber, "id-ID")) {
    console.log(chalk.red.inverse.bold(`Phone number not valid`));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("Thank you for filled the form"));
};

const listContacts = () => {
  const contacts = loadData();
  console.log(chalk.cyan.inverse.bold("Contact List: "));
  contacts.forEach((contact, i) => {
    console.log(
      `${i + 1}. Name: ${contact.name}, Email: ${contact.email}, Phone: ${
        contact.phoneNumber
      }, UniqueID: ${contact.id}`
    );
  });
};

const deleteContact = (name) => {
  const contacts = loadData();
  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  if (newContacts.length === contacts.length) {
    console.log(chalk.red.inverse.bold("Contact not found"));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(chalk.red.inverse.bold(`Contact deleted`));
};

const detailContact = (name) => {
  const contacts = loadData();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`Contact ${contact.name} not found`));
    return false;
  }

  console.log(chalk.green.inverse.bold(`${contact.name}'s details : `));
  console.log(`Name: ${contact.name}`);
  console.log(`Email: ${contact.email}`);
  console.log(`Phone number: ${contact.phoneNumber}`);
  console.log(`UniqueID: ${contact.id}`);
};

module.exports = { saveContact, listContacts, deleteContact, detailContact };
