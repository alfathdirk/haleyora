export default {
  id: 'roh-create-user',
  handler: async({ role, template }, ctx) => {
    const { services, getSchema } = ctx;
    const { UsersService } = services;

    try {
      const schema = await getSchema();
      const service = new UsersService({
        schema,
      });

      const password = generateRandom();
      const data = {
        password,
        ...template,
        role,
      };
      await service.createOne(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

const alphabets = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateRandom(len = 8) {
  let s = '';
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * alphabets.length);
    s += alphabets[index];
  }
  return s;
}
