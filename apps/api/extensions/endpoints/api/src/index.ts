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

      const employee = await useItemService(ctx, 'employee');
      const [user] = await employee.readByQuery({
        filter: {
          employee_id: {
            _eq: String(payloadToken.id),
          },
        },
        fields: [
          'user_id',
          'employee_id',
          'full_name',
          'email',
          'username',
          'role',
          'image',
          'status',
        ],
        alias: {
          user_id: 'id',
        },
      });

      /**
       * OK Employee Course
       */
      const employeeCourse = await useItemService(ctx, 'employee_course');
      const employeeCourseRecommendation = await useItemService(ctx, 'employee_course_recommendation');

      // OK Ongoing Course
      const employeeOngoingCourse = await employeeCourse.readByQuery({
        filter: {
          employee: {
            _eq: String(user.user_id),
          },
          completed: {
            _eq: 0,
          },
        },
        fields: [
          'id',
          'course.id',
          'course.status',
          'course.title',
          'course.image',
          'course.duration',
          'exam_score',
          'task_score',
          'last_video_duration',
          'tasks',
        ],
      });

      // OK Completed Course
      const employeeCompletedCourse = await employeeCourse.readByQuery({
        filter: {
          employee: {
            _eq: String(user.user_id),
          },
          completed: {
            _eq: 1,
          },
        },
        fields: [
          'id',
          'course.id',
          'course.status',
          'course.title',
          'course.image',
          'course.duration',
          'exam_score',
          'task_score',
          'last_video_duration',
          'tasks',
        ],
      });

      // OK Recommended Course
      const employeeRecommendedCourse = await employeeCourseRecommendation.readByQuery({
        filter: {
          employee: {
            _eq: String(user.user_id),
          },
        },
        fields: [
          'id',
          'course.id',
          'course.status',
          'course.title',
          'course.image',
          'course.duration',
        ],
      });

      /**
       * TODO Employee Ongoing Quiz
       */

      /**
       * OK Employee Certificate
       */
      const employeeCertificate = await useItemService(ctx, 'employee_certificate');
      const employeeValidCertificates = await employeeCertificate.readByQuery({
        filter: {
          employee: {
            _eq: String(user.user_id),
          },
          expired_days: {
            _gt: 0,
          },
        },
        fields: [
          'id',
          'course.id',
          'course.status',
          'course.title',
          'course.image',
          'course.duration',
          'expired_days',
        ],
      });

      /**
       * OK Employee Notification
       */
      const employeeNotification = await useItemService(ctx, 'notification');

      // OK Unread Notifications
      const employeeUnreadNotifications = await employeeNotification.readByQuery({
        filter: {
          employee_id: {
            _eq: String(user.user_id),
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
      const employeeReadNotifications = await employeeNotification.readByQuery({
        filter: {
          employee_id: {
            _eq: String(user.user_id),
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
      const employeeSearchHistory = await employeeSearch.readByQuery({
        filter: {
          employee: {
            _eq: String(user.user_id),
          },
        },
        fields: [
          'id',
          'search',
        ],
      });

      res.send({
        message: {
          EmployeeData: user,
          EmployeeCourseData: {
            Ongoing: employeeOngoingCourse,
            Completed: employeeCompletedCourse,
            Recommendation: employeeRecommendedCourse,
          },
          EmployeeCertificateData: employeeValidCertificates,
          OngoingQuizData: {},
          SearchHistoryData: employeeSearchHistory,
          NotificationData: {
            Unread: employeeUnreadNotifications,
            Read: employeeReadNotifications,
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
