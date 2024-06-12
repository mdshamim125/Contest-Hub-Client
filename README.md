# Contest Hub

Welcome to the Contest Hub! This is a web application that allows administrators to create and manage contests, as well as view and judge submissions from participants.

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
