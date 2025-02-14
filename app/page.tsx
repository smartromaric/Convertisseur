import CurrenterConverter from "./components/currenterConverter";
export default function Home() {
  return (
    <>
    <main className="h-screen bg-gray-100 flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl mb-5 text-center font-bold text-gray-900">Covertisseur de Valeur</h1>
      <CurrenterConverter/>
      </div>
    </main>
    </>
  );
}
