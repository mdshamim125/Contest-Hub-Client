# Contest Hub

Welcome to the Contest Hub! This is a web application that allows administrators to create and manage contests, as well as view and judge submissions from participants.

Contest Hub is a comprehensive web application designed for administrators to efficiently manage contests and submissions. It offers secure user authentication with encrypted passwords for data safety. The platform features multiple dashboards: an admin dashboard for overall contest and user management, a creator dashboard to manage contests before admin approval, and a user dashboard for managing participation, wins, profiles, and statistics. Contest creation includes details like contest name, prize money, and submission deadlines, while submissions can be viewed in detail, including participant information. Winners can be declared easily, with their status prominently displayed, and the application provides real-time updates using React Query for seamless data management. With secure API calls, responsive design, and Helmet integration for unique page titles, Contest Hub ensures a user-friendly experience across desktop, tablet, and mobile devices.

## Admin Credentials

- **Admin Username:** admin@gmail.com
- **Password:** 123qaz!Q

## Contest Hub URL

[Visit the Live Site](https://contest-hub-c5704.web.app)

## Features

**User Authentication:**

- Secure login and registration for administrators.
- Password encryption to ensure data safety.

**Dashboard:**

- Admin dashboard to manage the users and all contests.
  -Creator dashboard to manage the creator's contest before admin confirmation and declare the contest winner.
  -User dashboard to show his/her participated contests, winning contests, manage profile and winning statistics.
- Easy navigation and user-friendly interface.

**Contest Management:**

- Create new contests with details like contest name, prize money, submission deadline and more.
- View a list of all contests created by the creator.

**Submissions Viewing:**

- View all submissions for a selected contest.
- Detailed view of each submission including participant name, email.

**Declare Winner:**

- Ability to declare a winner for each contest submission.
- Once declared, the winner's status is prominently displayed.

**Real-Time Updates:**

- Submissions and contests data are fetched and displayed in real-time using React Query.
- Automatic updates upon declaring a winner without page refresh.

**Security:**

- Secure API calls using Axios with token authentication.
- Only authenticated users can access and manage contests.

**Responsive Design:**

- Mobile-friendly interface ensuring usability across different devices.
- Responsive layout adjusts seamlessly for desktop, tablet, and mobile views.

**Helmet Integration:**

- Unique titles for each page within the application.


## NPM Packages Used
The following NPM packages are used in this project:

- `@headlessui/react`: ^2.0.4
- `@stripe/react-stripe-js`: ^2.7.1
- `@stripe/stripe-js`: ^3.5.0
- `@tanstack/react-query`: ^5.40.0
- `axios`: ^1.7.2
- `chart.js`: ^4.4.3
- `firebase`: ^10.12.2
- `jsonwebtoken`: ^9.0.2
- `react`: ^18.2.0
- `react-chartjs-2`: ^5.2.0
- `react-countdown`: ^2.3.5
- `react-datepicker`: ^6.9.0
- `react-dom`: ^18.2.0
- `react-helmet`: ^6.1.0
- `react-helmet-async`: ^2.0.5
- `react-hook-form`: ^7.51.5
- `react-hot-toast`: ^2.4.1
- `react-icons`: ^5.2.1
- `react-loader-spinner`: ^6.1.6
- `react-router-dom`: ^6.23.1
- `react-simple-captcha`: ^9.3.1
- `sweetalert2`: ^11.11.0
- `swiper`: ^11.1.4

