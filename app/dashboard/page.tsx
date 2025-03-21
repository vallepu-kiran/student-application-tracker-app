"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, User, Loader } from "lucide-react"; // Import Loader icon
import { ApplicationTimeline } from "@/components/application-timeline";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { ChatbotButton } from "@/components/chatbot-button";
import { getUserData, getApplicationStatus } from "@/lib/api";
import { ApplicationStatus, UserData } from "@/lib/types";

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === "loading") return;

        if (status === "unauthenticated") {
          router.push("/auth/login");
          return;
        }

        const user = await getUserData();
        const appStatus = await getApplicationStatus();

        setUserData(user);
        setApplicationStatus(appStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, status]);

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[80vh]">
          <Loader className="animate-spin h-12 w-12 text-primary" />
        </div>
      </DashboardShell>
    );
  }

  if (!userData || !applicationStatus) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <Loader className="animate-spin h-12 w-12 text-primary" />
        </div>
      </DashboardShell>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "interview_scheduled":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "interview_scheduled":
        return "Interview Scheduled";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Application Dashboard"
        text="Track your application status and next steps"
      />

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Application Status
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Badge className={getStatusColor(applicationStatus.status)}>
                    {getStatusText(applicationStatus.status)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Last updated:{" "}
                  {new Date(applicationStatus.lastUpdated).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Selected Course
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.course}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Program duration: 12 weeks
                </p>
              </CardContent>
            </Card>

            {applicationStatus.status === "interview_scheduled" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Interview Details
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Date(
                      applicationStatus.lastUpdated ?? new Date()
                    ).toLocaleDateString()}
                  </div>
                  <div className="flex items-center mt-2">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      {new Date(
                        applicationStatus.lastUpdated ?? new Date()
                      ).toLocaleDateString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Button className="w-full mt-4" variant="outline" size="sm">
                    Join Interview
                  </Button>
                </CardContent>
              </Card>
            )}

            {applicationStatus.status === "accepted" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Payment Status
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <Badge variant="outline">Pending Payment</Badge>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    Make Payment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                Follow these steps to complete your application process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {applicationStatus.status === "pending" && (
                <>
                  <p>
                    Your application is currently under review by our admissions
                    team.
                  </p>
                  <p>
                    You will be notified when your application status changes.
                  </p>
                  <p>
                    If you have any questions, feel free to use the chat
                    assistant.
                  </p>
                </>
              )}

              {applicationStatus.status === "interview_scheduled" && (
                <>
                  <p>
                    Prepare for your upcoming interview with our admissions
                    team.
                  </p>
                  <p>
                    Make sure to review the course details and prepare any
                    questions you may have.
                  </p>
                  <p>
                    You can join the interview through the link provided above
                    at the scheduled time.
                  </p>
                </>
              )}

              {applicationStatus.status === "accepted" && (
                <>
                  <p>Congratulations! Your application has been accepted.</p>
                  <p>
                    To secure your spot, please complete the payment process.
                  </p>
                  <p>
                    After payment, you will receive further instructions about
                    course materials and start dates.
                  </p>
                </>
              )}

              {applicationStatus.status === "rejected" && (
                <>
                  <p>
                    We regret to inform you that your application was not
                    successful at this time.
                  </p>
                  <p>You can apply again for the next cohort in 3 months.</p>
                  <p>
                    If you have any questions, feel free to use the chat
                    assistant.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <CardDescription>
                Track the progress of your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicationTimeline status={applicationStatus} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your application details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </h3>
                  <p>{userData.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Email
                  </h3>
                  <p>{userData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Age
                  </h3>
                  <p>{userData.age}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Gender
                  </h3>
                  <p>{userData.gender}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Qualification
                  </h3>
                  <p>{userData.qualification}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Selected Course
                  </h3>
                  <p>{userData.course}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ChatbotButton />
    </DashboardShell>
  );
}
