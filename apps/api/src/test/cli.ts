import { Directus } from './directus.js';

(async() => {
  // await new Promise((resolve) => setTimeout(resolve, 300));
  const directus = await Directus.login();
  let id = '';
  try {
    const employee = await directus.createItem('employee', {
      full_name: 'Reek O Heek',
      email: 'reekoheek@gmail.com',
    });
    id = employee.id;
  } finally {
    if (id) {
      await directus.deleteItem('employee', id);
    }
  }
})();
