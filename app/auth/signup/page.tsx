import SignupForm from "@/components/signup-form";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <SignupForm />
      </div>
    </div>
  );
}
