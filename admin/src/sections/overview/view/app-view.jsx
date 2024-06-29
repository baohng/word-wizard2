import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';


import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [monthlyRegistrations, setMonthlyRegistrations] = useState([]);
  const [monthlyUserVisits, setMonthlyUserVisits] = useState([]);
  const [topicCount, setTopicCount] = useState(0);
  const [words, setWords] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/user-manager/users') // Fetch users from your backend
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  useEffect(() => {
    fetch('/api/user-managerwords')  // Fetch words from your backend
      .then(response => response.json())
      .then(data => setWords(data))
      .catch(error => console.error('Error fetching words:', error));
  }, []);
  useEffect(() => {
    // Fetch topic count from your backend when the component mounts
    fetch('/api/user-manager/total-topic-count') 
      .then(response => response.json())
      .then(data => setTopicCount(data))
      .catch(error => console.error('Error fetching topic count:', error));
  }, []);

  useEffect(() => {
    const fetchRegistrationsByMonth = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user-manager/registrations-by-month'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Chuyển đổi dữ liệu thành mảng phù hợp với AppWebsiteVisits
        const formattedData = Object.entries(data).map(([month, count]) => ({
          name: month,
          type: 'column',
          fill: 'solid',
          data: [count], // Mỗi tháng chỉ có 1 giá trị đăng ký
        }));
        const months = Object.keys(data); 
        setMonthlyRegistrations(formattedData);

      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchRegistrationsByMonth();
  }, []);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
      <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Total Topics" 
          total={topicCount}
          color="success"
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
        />
      </Grid>
     
      <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="New Users"
          total={users.length} // Display the number of users fetched
          color="info"
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
        />
      </Grid>

        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Total Words" 
          total={words.length} // Display the number of words fetched
          color="warning"
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
        />
      </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
      <AppWebsiteVisits
      AppWebsiteVisits monthlyUserVisits={monthlyUserVisits}
        title="User Registrations by Month"
        subheader="Last 12 Months"  
        chart={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: monthlyRegistrations, // Truyền trực tiếp dữ liệu đã định dạng
        }}
      />
    </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
