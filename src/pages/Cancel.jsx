export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        ❌ Payment canceled
      </h1>
      <p className="text-lg">You can try again anytime.</p>
    </div>
  );
}
