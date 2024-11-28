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

      const employeeItem = await useItemService(ctx, 'employee');
      const [employeeData] = await employeeItem.readByQuery({
        filter: {
          email: {
            _eq: userData.email,
          },
        },
        fields: '*',
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
        'course.activities.*.*.*.*',
      ];
      const concatEmployeeCourseActivity = (employeeCourseData: {
        course: {
          activities: {
            sub_sector: {
              sector_id: {
                category_id: {
                  name: string;
                };
                title: string;
              };
              title: string;
            };
            title: string;
          };
        };
      }[]) => {
        return employeeCourseData.map((item) => {
          const categoryName = item.course.activities.sub_sector.sector_id.category_id.name;
          const sectorName = item.course.activities.sub_sector.sector_id.title;
          const subSectorName = item.course.activities.sub_sector.title;
          const activityName = item.course.activities.title;

          const activities = `${categoryName} | ${sectorName} | ${subSectorName} | ${activityName}`;
          return {
            ...item,
            course: {
              ...item.course,
              activities,
            },
          };
        });
      };

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
          'video_duration',
          'tasks',
          'exam_attempt',
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
          'video_duration',
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
      const concatEmployeeCertificateCourseActivity = (employeeCertificateCourseData: {
        course: {
          course: {
            activities: {
              sub_sector: {
                sector_id: {
                  category_id: {
                    name: string;
                  };
                  title: string;
                };
                title: string;
              };
              title: string;
            };
          }
        }
      }[]) => {
        return employeeCertificateCourseData.map((item) => {
          const categoryName = item.course.course.activities.sub_sector.sector_id.category_id.name;
          const sectorName = item.course.course.activities.sub_sector.sector_id.title;
          const subSectorName = item.course.course.activities.sub_sector.title;
          const activityName = item.course.course.activities.title;

          const activities = `${categoryName} | ${sectorName} | ${subSectorName} | ${activityName}`;
          return {
            ...item,
            course: {
              ...item.course,
              course: {
                ...item.course.course,
                activities,
              },
            },
          };
        });
      };

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
          'course.course.activities.*.*.*.*',
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
            ongoing: concatEmployeeCourseActivity(employeeOngoingCourseData),
            completed: concatEmployeeCourseActivity(employeeCompletedCourseData),
            recommendation: concatEmployeeCourseActivity(employeeRecommendedCourseData),
          },
          employeeCertificateData: concatEmployeeCertificateCourseActivity(employeeValidCertificatesData),
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
    // formData.append('iduser', body.username);
    formData.append('username', body.username);
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
      const loginResult = await axios.post(
        // 'https://amanda.hpgroup.co.id/index.php?r=api%2Flogin',
        'http://103.156.15.193:3006/api/auth/login',
        formData,
      );

      // get cookies from response
      const cookies = loginResult.headers['set-cookie'];
      const refreshToken = cookies[0].split(';')[0].split('=')[1];

      const result = await axios.get('http://103.156.15.193:3006/api/auth/me', {
        headers: {
          Authorization: `Bearer ${loginResult.data.accessToken}`,
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      const users = await useItemService(ctx, 'employee');
      const [data] = await users.readByQuery({
        filter: {
          employee_id: {
            _eq: result.data.NO_INDUK,
          },
        },
      });

      const email = result.data.NO_INDUK + '@haleyora.co.id';
      const directusUsers = await useItemService(ctx, 'directus_users');

      if (!data) {
        users.createOne({
          employee_id: result.data.NO_INDUK,
          username: result.data.NO_INDUK,
          full_name: result.data.NAMA,
          email,
          status: 'active',
          work_status: result.data.STATUS_KERJA,
          photo: result.data.FOTO,
          placement: result.data.PENEMPATAN,
          gender: result.data.KELAMIN,
          date_of_birth: result.data.FTGL_LAHIR,
          place_of_birth: result.data.TP_LAHIR,
          address: result.data.ALAMAT,
          phone: result.data.HP,
          religion: result.data.AGAMA,
          unit_pln: result.data.DATA_SPK.UNIT_PLN,
          position: result.data.DATA_SPK.JABATAN,
          unit: result.data.DATA_SPK.DATA_UNIT.NAMA_UNIT,
          job: result.data.DATA_SPK.ID_KONTRAK.JENIS_PEKERJAAN,
          id_region: result.data.DATA_SPK.DATA_REGION.ID_REGION,
        });

        await sleep(800);
      }
      directusUsers.updateByQuery({
        filter: {
          email,
        },
      }, {
        role: 'e40bc4b2-8ada-4251-9957-a3f7f7bd6e3d',
        password: body.password,
        work_status: result.data.STATUS_KERJA,
        photo: result.data.FOTO,
        placement: result.data.PENEMPATAN,
        gender: result.data.KELAMIN,
        date_of_birth: result.data.FTGL_LAHIR,
        place_of_birth: result.data.TP_LAHIR,
        address: result.data.ALAMAT,
        phone: result.data.HP,
        religion: result.data.AGAMA,
        unit_pln: result.data.DATA_SPK.UNIT_PLN,
        position: result.data.DATA_SPK.JABATAN,
        unit: result.data.DATA_SPK.DATA_UNIT.NAMA_UNIT,
        job: result.data.DATA_SPK.ID_KONTRAK.JENIS_PEKERJAAN,
        id_region: result.data.DATA_SPK.DATA_REGION.ID_REGION,
      });
      await sleep(800);
      login(email, body.password);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return res.status(400).send(error.response.data);
        }
      }
      return res.status(400).send({ message: 'Login failed' });
    }
  });
});
