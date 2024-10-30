import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { Section } from "@/components/util/section";

export const PreFooter = () => {
  return (
    <Section className="w-full flex-none">
      <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
    </Section>
  );
};
