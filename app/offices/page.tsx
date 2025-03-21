import { TODAY } from "@/hooks/useFetchEvents";
import { useSEO } from "@/hooks/useSeo";
import client from "@/tina/client";
import { Metadata } from "next";
import OfficesPage from ".";
import { TinaClient } from "../tina-client";

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();
  const seo = tinaProps.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.data.global.header.url}offices`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);
  return { ...seoProps };
}

const getData = async () => {
  const tinaProps = await client.queries.officeIndexQuery({
    relativePath: "officesIndex.json",
    date: TODAY.toISOString(),
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      seo: tinaProps.data.officeIndex.seo,
      header: {
        url: tinaProps.data.global.header.url,
      },
    },
  };
};

export default async function Offices() {
  const { props } = await getData();
  return <TinaClient props={props} Component={OfficesPage} />;
}
