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
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  useEffect(() => {
    fetch('/api/user-managerwords') // Fetch words from your backend
      .then((response) => response.json())
      .then((data) => setWords(data))
      .catch((error) => console.error('Error fetching words:', error));
  }, []);
  useEffect(() => {
    const fetchTotalTopicCount = async () => {
      try {
        const response = await fetch('/api/user-manager/total-topic-count');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Total topic count:', data);
        setTopicCount(data);
      } catch (error) {
        console.error('Error fetching topic count:', error);
      }
    };
    fetchTotalTopicCount();
  }, []);

  useEffect(() => {
    const fetchRegistrationsByMonth = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/user-manager/registrations-by-month'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const formattedData = Object.entries(data).map(([month, count]) => ({
          name: month,
          type: 'column',
          fill: 'solid',
          data: [count],
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
            AppWebsiteVisits
            monthlyUserVisits={monthlyUserVisits}
            title="User Registrations by Month"
            subheader="Last 12 Months"
            chart={{
              labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: monthlyRegistrations, // Truyền trực tiếp dữ liệu đã định dạng
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'Admin', value: 1 },
                { label: 'Student', value: 0 },
                { label: 'Teacher', value: 0 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English'],
              series: [{ name: 'Series 1', data: [100, 30, 30] }],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
