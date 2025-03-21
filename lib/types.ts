export interface UserData {
  password: string;
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  qualification: string;
  course: string;
}

export interface ApplicationStatus {
  id: string;
  userId: string;
  status: "pending" | "interview_scheduled" | "accepted" | "rejected";
  applicationDate: string;
  reviewDate: string | null;
  interviewDate: string | null;
  decisionDate: string | null;
  lastUpdated: string;
  paymentStatus: "pending" | "completed";
  paymentDate: string | null;
}