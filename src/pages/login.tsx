import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { useState } from "react";
import BaseLayout from "../components/BaseLayout";

function signin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <BaseLayout>
      <div className="flex w-full flex-col items-center gap-8">
        <h1 className="text-2xl font-bold">Insira seu e-mail do Insper:</h1>

        {!loading ? (
          <>
            <input
              type="email"
              className="w-1/2 rounded border border-black p-2"
              placeholder="elonrm@al.insper.edu.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="m-2 w-1/2 rounded border-2 border-gray-200 py-4 px-8 text-lg font-bold shadow-2xl"
              onClick={() => {signIn("email", { email }); setLoading(true)}  }
            >
              Entrar
            </button>
          </>
        ) : (
          <h1>Carregando...</h1>
        )}
      </div>
    </BaseLayout>
  );
}

export default signin;

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}
