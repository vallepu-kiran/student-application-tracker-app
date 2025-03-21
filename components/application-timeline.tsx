import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { ApplicationStatus } from "@/lib/types";

interface ApplicationTimelineProps {
  status: ApplicationStatus;
}

export function ApplicationTimeline({ status }: ApplicationTimelineProps) {
  const steps = [
    {
      id: "application_submitted",
      title: "Application Submitted",
      description: "Your application has been received",
      date: new Date(status.applicationDate).toLocaleDateString(),
      status: "completed",
    },
    {
      id: "application_review",
      title: "Application Review",
      description: "Our team is reviewing your application",
      date: status.reviewDate ? new Date(status.reviewDate).toLocaleDateString() : "Pending",
      status: status.status === "pending" ? "current" : (status.reviewDate ? "completed" : "pending"),
    },
    {
      id: "interview_scheduled",
      title: "Interview Scheduled",
      description: "Schedule an interview with our admissions team",
      date: status.interviewDate ? new Date(status.interviewDate).toLocaleDateString() : "Pending",
      status: status.status === "interview_scheduled" ? "current" : 
             (status.status === "accepted" || status.status === "rejected" ? "completed" : "pending"),
    },
    {
      id: "decision",
      title: "Admission Decision",
      description: status.status === "accepted" ? "Congratulations! You've been accepted" : 
                  (status.status === "rejected" ? "Application not successful" : "Pending decision"),
      date: status.decisionDate ? new Date(status.decisionDate).toLocaleDateString() : "Pending",
      status: status.status === "accepted" || status.status === "rejected" ? "current" : "pending",
    },
    {
      id: "payment",
      title: "Payment",
      description: "Complete your payment to secure your spot",
      date: status.paymentDate ? new Date(status.paymentDate).toLocaleDateString() : "Pending",
      status: status.paymentStatus === "completed" ? "completed" : 
             (status.status === "accepted" ? "current" : "pending"),
    },
  ];

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex">
          <div className="flex flex-col items-center mr-4">
            <div>
              {step.status === "completed" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              ) : step.status === "current" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <div className="h-2 w-2 rounded-full bg-gray-400" />
                </div>
              )}
              {index < steps.length - 1 && (
                <div className={`h-12 w-0.5 ${step.status === "completed" ? "bg-green-600" : "bg-gray-200"}`} />
              )}
            </div>
          </div>
          <div className="pb-8">
            <div className="flex items-baseline">
              <p className="font-medium text-sm">{step.title}</p>
              <span className="ml-2 text-xs text-gray-500">{step.date}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}