import Layout from "../../components/Layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import DaoTemplate from "@components/dao/DaoTemplate";

// move dao to a wildcard subdomain
export default function Dao({ daoData }) {
  return (
    <>
      <DaoTemplate subdomain="skeep" />
    </>
  );
}

// routing for the dao urls should be dynamic... the routing for the dao pages is contained here.

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { id: "spreadly" } }, { params: { id: "ergopad" } }];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const daoData = {};
  console.log('aparms', params)
  return {
    props: {
      daoData,
    },
  };
};
