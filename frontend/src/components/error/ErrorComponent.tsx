const ErrorComponent = (error: string[]) => {
  return (
    <ul className="bg-red-100 w-1/2 mb-2 mx-auto text-red-600 text-sm list-disc list-inside p-4 rounded">
      {error.map((err, i) => (
        <li key={i}>{err}</li>
      ))}
    </ul>
  );
};

export default ErrorComponent;
