import { ApplicationStatus, UserData } from "@/lib/types";

let users: UserData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    age: "25",
    gender: "male",
    qualification: "College Graduate",
    course: "Creator Marketer",
    password: "John8008",
  },
];

let applications: ApplicationStatus[] = [
  {
    id: "1",
    userId: "1",
    status: "interview_scheduled",
    applicationDate: "2023-05-15T10:00:00Z",
    reviewDate: "2023-05-18T14:30:00Z",
    interviewDate: "2023-05-25T15:00:00Z",
    decisionDate: null,
    lastUpdated: "2023-05-18T14:30:00Z",
    paymentStatus: "pending",
    paymentDate: null,
  },
];

export async function getUserData(): Promise<UserData | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users[0]);
    }, 500);
  });
}

export async function getApplicationStatus(): Promise<ApplicationStatus | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(applications[0]);
    }, 500);
  });
}

export async function getUserByEmail(email: string): Promise<UserData | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.email === email);
      resolve(user || null);
    }, 500);
  });
}

export async function createUser(userData: any): Promise<UserData | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: UserData = {
        id: String(users.length + 1),
        name: userData.name,
        email: userData.email,
        age: userData.age,
        gender: userData.gender,
        qualification: userData.qualification,
        course: userData.course,
        password: userData.password,
      };

      users.push(newUser);

      const newApplication: ApplicationStatus = {
        id: String(applications.length + 1),
        userId: newUser.id,
        status: "pending",
        applicationDate: new Date().toISOString(),
        reviewDate: null,
        interviewDate: null,
        decisionDate: null,
        lastUpdated: new Date().toISOString(),
        paymentStatus: "pending",
        paymentDate: null,
      };

      applications.push(newApplication);

      resolve(newUser);
    }, 500);
  });
}

export async function updateApplicationStatus(
  applicationId: string,
  updates: Partial<ApplicationStatus>
): Promise<ApplicationStatus | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = applications.findIndex((a) => a.id === applicationId);

      if (index !== -1) {
        applications[index] = {
          ...applications[index],
          ...updates,
          lastUpdated: new Date().toISOString(),
        };

        resolve(applications[index]);
      } else {
        resolve(null);
      }
    }, 500);
  });
}
