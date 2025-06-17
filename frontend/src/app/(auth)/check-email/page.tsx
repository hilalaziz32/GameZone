export default function CheckEmailPage() {
  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      <h1 className="text-2xl font-bold mb-4">Check your email</h1>
      <p>
        We&apos;ve sent a confirmation link to your email.<br />
        Click the link to confirm your account, then sign in.
      </p>
      <div className="mt-6 text-gray-500">
        Didn&apos;t get it? Check your spam folder, or <b>try signing up again</b> with the correct email.
      </div>
    </div>
  );
}
