import { defineEndpoint } from '@directus/extensions-sdk';
import axios from 'axios';
import { useItemService } from './service/ItemService';

export default defineEndpoint(async(router, ctx) => {
  const { services, getSchema } = ctx;
  const { ItemsService } = services;

  router.post('/', async(req, res) => {
    console.log(req.accountability);
    const body = req.body;
    const formData = new FormData();
    formData.append('iduser', body.username);
    formData.append('password', body.password);

    try {
      const result = await axios.post('https://amanda.hpgroup.co.id/index.php?r=api%2Flogin', formData);
      const users = await useItemService(ctx, 'user_employee');
      res.send(result.data);
    } catch (error) {
      res.send(error.response.data);
    }
  });
});
