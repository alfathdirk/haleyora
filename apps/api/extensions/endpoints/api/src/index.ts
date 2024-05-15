import { defineEndpoint } from '@directus/extensions-sdk';
import axios from 'axios';
import { useItemService } from './service/ItemService';
import { useAuthService } from './service/AuthService';
import fs from 'fs';
import path from 'path';

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

  router.post('/generate-certificate/:certificate_id', async(req, res) => {
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
      if (!payloadToken) {
        throw new Error('UNAUTHORIZED!');
      }

      const params = req.params;
      const certificateId = params.certificate_id;
      if (!certificateId) {
        throw new Error('certificate_id is empty!');
      }

      const employeeCertificateItem = await useItemService(ctx, 'employee_certificate');
      const [employeeValidCertificateData] = await employeeCertificateItem.readByQuery({
        filter: {
          id: {
            _eq: String(certificateId),
          },
        },
        fields: [
          'id',
          'employee.full_name',
          'user_created',
          'course.course.title',
          'expired_days',
        ],
      });

      const certificateSettingItem = await useItemService(ctx, 'certificate_setting');
      const [certificateSettingData] = await certificateSettingItem.readByQuery({
        fields: [
          'id',
          'title',
          'signature',
          'pic',
        ],
      });

      // Read the contents of the uploads directory
      const files = fs.readdirSync('uploads');

      // Find the file that starts with "a"
      const file = files.find(f => f.startsWith(`${certificateSettingData.signature}`));

      // If the file is found, read its contents
      if (file) {
        const filePath = path.join('uploads', file);
        const fileContent = fs.readFileSync(filePath, 'base64');

        // const formData = new FormData();
        // formData.append('employeeName', employeeValidCertificateData.employee.full_name);
        // formData.append('courseName', employeeValidCertificateData.course.course.title);
        // formData.append('courseTaken', employeeValidCertificateData.user_created);
        // formData.append('validUntil', employeeValidCertificateData.expired_days);
        // formData.append('certificateId', employeeValidCertificateData.id);
        // formData.append('picTitle', certificateSettingData.title);
        // formData.append('picSignatureBase64', fileContent);
        // formData.append('picName', certificateSettingData.pic);

        const objectData = {
          employeeName: employeeValidCertificateData.employee.full_name,
          courseName: employeeValidCertificateData.course.course.title,
          courseTaken: employeeValidCertificateData.user_created,
          validUntil: employeeValidCertificateData.expired_days,
          certificateId: employeeValidCertificateData.id,
          picTitle: certificateSettingData.title,
          picSignatureBase64: fileContent,
          picName: certificateSettingData.pic,
        };

        const result = await axios({
          method: 'post',
          url: 'http://localhost:3000/generate-certificate',
          headers: {},
          data: objectData,
        });

        return res.send({
          message: result,
        });
      } else {
        throw new Error('Signature file not found!');
      }
    } catch (error: unknown) {
      console.log('🚀 ~ router.post ~ error:', error.message);
      res.send({ message: 'Generate employee certificate failed!', error: error.message });
    }
  });

  router.get('/get-certificate/:certificate_id', async(req, res) => {
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
      if (!payloadToken) {
        throw new Error('UNAUTHORIZED!');
      }

      const params = req.params;
      const certificateId = params.certificate_id;
      if (!certificateId) {
        throw new Error('certificate_id is empty!');
      }

      const result = await axios({
        method: 'get',
        url: `http://localhost:3000/certificate/${certificateId}`,
      });

      return res.send({
        message: result,
      });
    } catch (error: unknown) {
      console.log('🚀 ~ router.post ~ error:', error.message);
      res.send({ message: 'Generate employee certificate failed!', error: error.message });
    }
  })

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
