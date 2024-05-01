import { defineEndpoint } from '@directus/extensions-sdk';
import axios from 'axios';
import { useItemService } from './service/ItemService';
import { useAuthService } from './service/AuthService';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineEndpoint((router, ctx) => {
  router.get('/hello', async(req, res) => {
    try {
      res.send({ message: 'Hello, world!' });
    } catch (error) {
      // console.log(error);
      res.send({ message: 'Hello, world!', error: error.message });
    }
  });

  router.post('/login', async(req, res) => {
    const body = req.body;
    const formData = new FormData();
    formData.append('iduser', body.username);
    formData.append('password', body.password);

    const login = async(email: string, password: string) => {
      try {
        const authService = await useAuthService(ctx);
        const resultAuth = await authService.login('default', {
          email,
          password,
        });
        return res.send(resultAuth);
      } catch (error) {
        return res.status(400).send({ message: 'Login failed!' });
      }
    };

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

      const email = `${result.data.userid}_elearning@haleyorapower.co.id`;

      if (!data) {
        const directusUsers = await useItemService(ctx, 'directus_users');
        users.createOne({
          employee_id: result.data.userid,
          username: result.data.userid,
          full_name: result.data.username,
          email,
          status: 'active',
        });
        await sleep(1000);
        directusUsers.updateByQuery({
          filter: {
            email,
          },
        }, {
          password: body.password,
        });
      }
      login(email, body.password);
    } catch (error: unknown) {
      console.log('error kesini', error.message);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return res.status(400).send(error.response.data);
        }
      }
      return res.status(400).send({ message: 'Login failed' });
    }
  });
});
