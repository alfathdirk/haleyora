import { Directus } from './directus.js';

(async() => {
  // await new Promise((resolve) => setTimeout(resolve, 300));
  const directus = await Directus.login();
  let id = '';
  try {
    const employee = await directus.createItem('user', {
      full_name: 'Jafar Shadiq',
      email: 'reekoheek@gmail.com',
    });
    id = employee.id;
  } finally {
    if (id) {
      await directus.deleteItem('user', id);
    }
  }
})();
