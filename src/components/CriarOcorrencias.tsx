import { api } from "../utils/api";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers } from "formik";

function CriarOcorrencias() {
  const { username } = useRouter().query;

  // ------ trcp stuff ------
  const { data, error } = api.ocorrencias.podeCriarOcorrencia.useQuery(
    {
      username: username as string,
    },
    {
      enabled: !!username,
    }
  );

  const { data: profileData } = api.profile.getProfileFromUsername.useQuery(
    { username: username as string },
    {
      enabled: !!username,
    }
  );

  // ------------

  if (data === true) {
    interface Values {
      titulo: string;
      descricao: string;
      pontos: number;
    }

    return (
      <div className="flex w-full flex-col gap-6 rounded border-2 border-red-700 p-4">
        <h2 className="text-xl font-bold">
          Criar ocorrência para: {profileData?.nome}
        </h2>
        <Formik
          initialValues={{
            titulo: "",
            descricao: "",
            pontos: 0,
          }}
          onSubmit={(values: Values) => {
            console.log(values);
          }}
        >
          <Form className="flex flex-col items-center gap-4">
            <div className="flex w-full flex-col">
              <label htmlFor="titulo" className="text-lg font-medium">
                Título:
              </label>
              <Field
                id="titulo"
                name="titulo"
                className="rounded border border-black p-2"
                placeholder="Falou mal"
              />
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="descricao" className="text-lg font-medium">
                Descrição:
              </label>
              <Field
                id="descricao"
                className="rounded border border-black p-2"
                name="descricao"
                placeholder="n gostou"
              />
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="pontos" className="text-lg font-medium">
                Pontos:
              </label>
              <Field
                id="pontos"
                name="pontos"
                className="rounded border border-black p-2"
                placeholder="0"
                type="number"
              />
            </div>

            <button
              type="submit"
              className="m-2 w-48 rounded border-2 border-gray-200 py-4 px-8 text-lg font-bold shadow-2xl"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    );
  } else if (data === false) {
    console.log("Voce nao pode criar ocorrencias para essa pessoa");

    return <div>Criar ocorrencia para: </div>;
  } else {
    return null;
  }
}

export default CriarOcorrencias;
