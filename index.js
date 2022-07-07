console.clear();
const contact = require("./contact.js");

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  //  await console.log(action, id, name, email, phone)
  switch (action) {
    case 'list':
      const allContacts = await contact.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const findContact = await contact.getContactById(id);
      console.log(findContact);
      break;

    case 'add':
      const newContact = await contact.addContact(name, email, phone);
      console.log(newContact);
      break;
    
    case 'remove':
      const deletedContact = await contact.removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};


invokeAction(argv);