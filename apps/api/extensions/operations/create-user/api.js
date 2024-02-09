export default {
  id: 'roh-create-user',
  handler: async({ role, template }, ctx) => {
    try {
      const password = generateRandom();
      const user = {
        password,
        ...template,
        role: await getRoleId(ctx, role),
      };

      await createUser(ctx, user);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

let roles;
async function getRoleId(ctx, q) {
  if (!roles) {
    const { services, getSchema } = ctx;
    const { RolesService } = services;
    const schema = await getSchema();
    const rolesService = new RolesService({
      schema,
    });
    roles = await rolesService.readByQuery({});
  }

  const role = roles.find((role) => role.id === q || role.name === q);
  if (!role) {
    throw new Error('role not found. ' + q);
  }
  return role;
}

async function createUser(ctx, user) {
  const { services, getSchema } = ctx;
  const { UsersService } = services;
  const schema = await getSchema();
  const usersService = new UsersService({
    schema,
  });
  const result = await usersService.createOne(user);
  return result;
}

const alphabets = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateRandom(len = 8) {
  let s = '';
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * alphabets.length);
    s += alphabets[index];
  }
  return s;
}
