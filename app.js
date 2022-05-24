const yargs = require("yargs");
const { v4: uuid } = require("uuid");
const contacts = require("./contact");

yargs
  .command({
    command: "add",
    describe: "To add new contact",
    builder: {
      name: {
        describe: "Full name of the contact",
        demand: true,
        type: "string",
      },
      email: {
        describe: "Email address of the contact",
        demand: false,
        type: "string",
      },
      phoneNumber: {
        describe: "Phone number of the contact",
        demand: true,
        type: "string",
      },
    },
    handler(argv) {
      const id = uuid();
      contacts.saveContact(id, argv.name, argv.email, argv.phoneNumber);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Show the list of contacts",
  handler() {
    contacts.listContacts();
  },
});

yargs.command({
  command: "delete",
  describe: "Delete a contact by search the name",
  builder: {
    name: {
      describe: "Search the contact by name",
      demand: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.name);
  },
});

yargs.command({
  command: "detail",
  describe: "Show the contact details",
  builder: {
    name: {
      describe: "Contact name",
      demand: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.name);
  },
});

yargs.parse();
