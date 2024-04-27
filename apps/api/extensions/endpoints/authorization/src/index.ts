import { defineEndpoint } from '@directus/extensions-sdk';
import axios from 'axios';
import { useItemService } from './service/ItemService';

export default defineEndpoint((router, ctx) => {
  router.get('/hello', async(req, res) => {
    const users = await useItemService(ctx, 'course');
    const result = await users.readByQuery({
      fields: ['*.*.*.*.*'],
    });
    // res.send({ message: 'Hello, world!' });

    res.send(result);
  });

  router.post('/login', async(req, res) => {
    const body = req.body;
    const formData = new FormData();
    formData.append('iduser', body.username);
    formData.append('password', body.password);

    try {
      const result = await axios.post('https://amanda.hpgroup.co.id/index.php?r=api%2Flogin', formData);
      const users = await useItemService(ctx, 'employee');

      const [data] = await users.readByQuery({
        filter: {
          employee_id: {
            _eq: result.data.userid,
          },
        },
      });

      if (!data) {
        const directusUsers = await useItemService(ctx, 'directus_users');
        await users.createOne({
          employee_id: result.data.userid,
          username: result.data.userid,
          full_name: result.data.username,
          email: `${result.data.userid}_elearning@haleyorapower.co.id`,
          status: 'active',
        });
        // eslint-disable-next-line max-nested-callbacks
        setTimeout(() => {
          directusUsers.updateByQuery({
            filter: {
              email: `${result.data.userid}_elearning@haleyorapower.co.id`,
            },
          }, {
            password: body.password,
          });
        }, 1000);
      }
      res.send(result.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return res.send(error.response.data);
        }
      }
      res.send({ message: 'Login failed' });
    }
  });
});
