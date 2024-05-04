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

  router.get('/me', async(req, res) => {
    try {
      // OK Decode token
      const bearerToken = req.headers.authorization;
      const parseJwt = (token: string | undefined) => {
        if (token) {
          return JSON.parse(
            Buffer.from(String(token.split('.')[1]), 'base64').toString(),
          );
        } else {
          throw new Error('Token not found');
        }
      };
      const payloadToken = parseJwt(bearerToken);

      const userItem = await useItemService(ctx, 'directus_users');
      const [userData] = await userItem.readByQuery({
        filter: {
          id: {
            _eq: payloadToken.id,
          },
        },
        fields: [
          'id',
          'email',
        ],
      });
      const username = userData.email.split('_')[0];

      const employeeItem = await useItemService(ctx, 'employee');
      const [employeeData] = await employeeItem.readByQuery({
        filter: {
          employee_id: {
            _eq: String(username),
          },
        },
        fields: [
          'id',
          'employee_id',
          'full_name',
          'email',
          'username',
          'role',
          'image',
          'status',
        ],
      });

      /**
       * OK Employee Course
       */
      const employeeCourseItem = await useItemService(ctx, 'employee_course');
      const employeeCourseRecommendationItem = await useItemService(ctx, 'employee_course_recommendation');
      const employeeCourseDataFields = [
        'course.id',
        'course.status',
        'course.title',
        'course.image',
        'course.duration',

        // Category detail
        'course.activities.sub_sector.sector_id.category_id.id',
        'course.activities.sub_sector.sector_id.category_id.name',
        'course.activities.sub_sector.sector_id.category_id.image',

        // Sector detail
        'course.activities.sub_sector.sector_id.id',
        'course.activities.sub_sector.sector_id.title',

        // Sub Sector detail
        'course.activities.sub_sector.id',
        'course.activities.sub_sector.title',

        // Activity detail
        'course.activities.id',
        'course.activities.title',
        'course.activities.status',
      ];

      // OK Ongoing Course
      const employeeOngoingCourseData = await employeeCourseItem.readByQuery({
        filter: {
          employee: {
            _eq: String(employeeData.id),
          },
          completed: {
            _eq: 0,
          },
        },
        fields: [
          'id',
          ...employeeCourseDataFields,
          'exam_score',
          'task_score',
          'last_video_duration',
          'tasks',
        ],
      });

      // OK Completed Course
      const employeeCompletedCourseData = await employeeCourseItem.readByQuery({
        filter: {
          employee: {
            _eq: String(employeeData.id),
          },
          completed: {
            _eq: 1,
          },
        },
        fields: [
          'id',
          ...employeeCourseDataFields,
          'exam_score',
          'task_score',
          'last_video_duration',
          'tasks',
        ],
      });

      // OK Recommended Course
      const employeeRecommendedCourseData = await employeeCourseRecommendationItem.readByQuery({
        filter: {
          employee: {
            _eq: String(employeeData.id),
          },
        },
        fields: [
          'id',
          ...employeeCourseDataFields,
        ],
      });

      /**
       * TODO Employee Ongoing Quiz
       */

      /**
       * OK Employee Certificate
       */
      const employeeCertificateItem = await useItemService(ctx, 'employee_certificate');
      const employeeValidCertificatesData = await employeeCertificateItem.readByQuery({
        filter: {
          employee: {
            _eq: String(employeeData.id),
          },
          expired_days: {
            _gt: 0,
          },
        },
        fields: [
          'id',
          'course.id',
          'course.completed',
          'course.exam_score',
          'course.task_score',
          'course.tasks',
          'course.course.id',
          'course.course.status',
          'course.course.title',
          'course.course.image',
          'course.course.duration',
          'expired_days',
        ],
      });

      /**
       * OK Employee Notification
       */
      const employeeNotificationItem = await useItemService(ctx, 'notification');

      // OK Unread Notifications
      const employeeUnreadNotificationsData = await employeeNotificationItem.readByQuery({
        filter: {
          employee_id: {
            _eq: String(employeeData.id),
          },
          is_read: {
            _eq: 0,
          },
        },
        fields: [
          'id',
          'title',
          'description',
        ],
      });

      // OK Read Notifications
      const employeeReadNotificationsData = await employeeNotificationItem.readByQuery({
        filter: {
          employee_id: {
            _eq: String(employeeData.id),
          },
          is_read: {
            _eq: 1,
          },
        },
        fields: [
          'id',
          'title',
          'description',
        ],
      });

      /**
       * OK Employee Search History
       */
      const employeeSearch = await useItemService(ctx, 'employee_search');
      const employeeSearchHistoryData = await employeeSearch.readByQuery({
        filter: {
          employee: {
            _eq: String(employeeData.id),
          },
        },
        fields: [
          'id',
          'search',
        ],
      });

      res.send({
        message: {
          employeeData,
          employeeCourseData: {
            ongoing: employeeOngoingCourseData,
            completed: employeeCompletedCourseData,
            recommendation: employeeRecommendedCourseData,
          },
          employeeCertificateData: employeeValidCertificatesData,
          ongoingQuizData: {
            message: 'TODO!!',
          },
          searchHistoryData: employeeSearchHistoryData,
          notificationData: {
            unread: employeeUnreadNotificationsData,
            read: employeeReadNotificationsData,
          },
        },
      });
    } catch (error: unknown) {
      res.send({ message: 'Fetch user detail failed!', error });
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
      const result = await axios.post(
        'https://amanda.hpgroup.co.id/index.php?r=api%2Flogin',
        formData,
      );
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
