import { Layout } from "components/layout";

export const NotFoundPage = () => {
  return (
    <Layout title={"Страница не найдена"}>
      <div className="inDevelopment">Увы, такой страницы не существует</div>
    </Layout>
  );
};
