import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader } from "lucide-react";

export default function layout({
  children,
  isLoading = false,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1">
        <section
          className="w-full min-h-[320px] 
             bg-no-repeat bg-cover bg-bottom 
             border border-transparent 
             text-gray-100 box-border
             bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0)),url('https://apply-lit-school.vercel.app/assets/images/banner-mobile.svg')]
             md:bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0)),url('https://apply-lit-school.vercel.app/assets/images/banner.svg')]"
        >
          <div className="container px-4 pt-8">
            <div className="flex items-center">
              <Image
                src="https://apply-lit-school.vercel.app/assets/images/lit-logo.svg"
                alt="LIT Logo"
                width={40}
                height={40}
                className="mr-2"
              />
            </div>
          </div>
        </section>

        <section className="w-full mt-10 justify-center">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold">
              Join the Education Revolution!
            </h1>
            <p>Access your dashboard by verifying your Email</p>
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <Loader className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : (
              children
            )}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Your Application Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3] bg-blue-600 rounded-lg overflow-hidden">
                  <Image
                    src="https://apply-lit-school.vercel.app/assets/images/application-step-01.svg"
                    alt="Fill Application Form"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3] bg-yellow-600 rounded-lg overflow-hidden">
                  <Image
                    src="https://apply-lit-school.vercel.app/assets/images/application-step-02.svg"
                    alt="Appear For Interview"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3] bg-orange-600 rounded-lg overflow-hidden">
                  <Image
                    src="https://apply-lit-school.vercel.app/assets/images/application-step-03.svg"
                    alt="Complete The LITMUS Test"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-4 bg-black">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Have Questions?
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/20"
              >
                <AccordionTrigger className="px-6 py-4 md:py-8 hover:bg-gray-900/50 transition-all">
                  How will I get the link to attend the program?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 md:py-8 bg-gray-900/30">
                  Once you&apos;re accepted into the program, you&apos;ll
                  receive all necessary links and access information via email.
                  Make sure to check your inbox regularly, including spam
                  folders.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/20"
              >
                <AccordionTrigger className="px-6 py-4 md:py-8 hover:bg-gray-900/50 transition-all">
                  What if I have questions about registration, attendance, etc?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 md:py-8 bg-gray-900/30">
                  Our support team is available to help with any questions about
                  registration, attendance, or other program details. You can
                  reach out through the chat assistant on your dashboard or
                  email support@litschool.com.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/20"
              >
                <AccordionTrigger className="px-6 py-4 md:py-8 hover:bg-gray-900/50 transition-all">
                  Why is this program free?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 md:py-8 bg-gray-900/30">
                  We believe in making quality education accessible. The program
                  is sponsored by industry partners who are invested in
                  developing the next generation of talent. While the core
                  program is free, some advanced modules may have associated
                  costs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/20"
              >
                <AccordionTrigger className="px-6 py-4 md:py-8 hover:bg-gray-900/50 transition-all">
                  Will I get the recording of the program?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 md:py-8 bg-gray-900/30">
                  Yes, recordings of all sessions will be available in your
                  dashboard for a limited time. This allows you to review the
                  material or catch up if you missed a session.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/20"
              >
                <AccordionTrigger className="px-6 py-4 md:py-8 hover:bg-gray-900/50 transition-all">
                  If I miss attending the class can I attend the repeat?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 md:py-8 bg-gray-900/30">
                  We understand that schedules can be challenging. If you miss a
                  class, you can watch the recording and, in many cases, join
                  repeat sessions that are scheduled for different time zones or
                  cohorts.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-12 bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="https://apply-lit-school.vercel.app/assets/images/lit-logo.svg"
                  alt="LIT Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="font-bold text-xl">LIT</span>
              </div>
              <h3 className="text-2xl font-bold">Learn Innovate Transform</h3>
              <p className="text-gray-400 max-w-md">
                LIT is a one-of-a-kind experiential learning program for the
                next generation of learners.
              </p>
            </div>

            <div className="flex flex-col md:items-end space-y-4">
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Button>
              </div>
              <div className="text-gray-400 text-sm">
                © 2025 Disruptive Edu Pvt. Ltd. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
