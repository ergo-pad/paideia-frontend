import "../styles/global.css";
import { AppProps } from "next/app";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";
import { DarkTheme, LightTheme } from "../theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "../lib/ThemeContext";
import { AppApi } from "../lib/AppApi";
import { GlobalContext } from "../lib/AppContext";
import CssBaseline from "@mui/material/CssBaseline";
import Dao from "./dao/[id]";
import Layout from "@components/Layout";
import Creation from "./creation";
import Notifications from "./dao/[id]/notifications";
import DaoTemplate from "@components/dao/DaoTemplate";
import Dashboard from "@components/dao/dashboard/Dashboard";
import Profile from "./dao/[id]/profile";
import { useRouter } from "next/router";
import Edit from "./dao/[id]/profile/edit";
import All from "./dao/[id]/proposals/all";
import Following from "./dao/[id]/proposals/following";
import Mine from "./dao/[id]/proposals/mine";
import Past from "./dao/[id]/proposals/past";
import EditNotifications from "./dao/[id]/notifications/edit";
import Proposal from "./dao/[id]/proposal/[proposal_id]";
import Discussion from "./dao/[id]/discussion/[discussion_id]";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(LightTheme);
  const [alert, setAlert] = React.useState({ show: false });
  const router = useRouter();
  const [daoId, setDaoId] = React.useState<any>(router.query.id);

  React.useEffect(() => {
    setTheme(localStorage.getItem("theme") === "dark" ? DarkTheme : LightTheme);
  }, []);

  React.useEffect(() => {
    let temp = theme === LightTheme ? "light" : "dark";
    localStorage.setItem("theme", temp);
  }, [theme]);

  console.log(router);
  const api = new AppApi(alert, setAlert, theme, setTheme, daoId, setDaoId);
  return Component === Creation ||
    Component === Dao ||
    Component === Notifications ||
    Component === Profile ||
    Component === Dashboard ||
    Component === Edit ||
    Component === All ||
    Component === Following ||
    Component === Mine ||
    Component === EditNotifications ||
    Component === Proposal ||
    Component === Discussion ||
    Component === Past ? (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <CssBaseline />
        <GlobalContext.Provider value={{ api }}>
          {Component !== Creation ? (
            <DaoTemplate subdomain="">
              <Component {...pageProps} />
            </DaoTemplate>
          ) : (
            <Component {...pageProps} />
          )}
        </GlobalContext.Provider>
      </ThemeContext.Provider>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = [{ params: { id: "spreadly" } }, { params: { id: "ergopad" } }];
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const daoData = { params };
//   return {
//     props: {
//       params,
//     },
//   };
// };

export async function getServerSideProps(context) {
  // possibilities
  // paideia.im
  // {dao_name}.paideia.im
  let wildcard = context.req.headers.host.split(".")[0];
  let all_ids = ["spreadly", "ergopad"];

  console.log(context.req.headers.host);

  wildcard =
    all_ids.indexOf(wildcard) > -1
      ? wildcard != "localhost:3000"
        ? wildcard
        : "home"
      : "home";
  return { props: { wildcard } };
}
