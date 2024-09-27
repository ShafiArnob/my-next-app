import { Model } from "./SchemaVisualizer.types";

export const getInfoFromSchema = (schema: String): { models: Model[] } => {
  const modelStrings = Array.from(
    schema.matchAll(/model \w+{[\w\s:;\[\]]+}/g)
  ).map((i) => i[0]);

  // console.log(modelStrings);

  const modelNames = modelStrings.map((modelString) => {
    return Array.from(modelString.matchAll(/model (\w+)/g))?.[0]?.[1];
  });

  // console.log(modelNames);

  const parseModels: Model[] = modelStrings.map((modelString, index) => {
    return {
      name: modelNames[index],
      fields: Array.from(modelString.matchAll(/(\w+): (\w+)/g)).map((field) => {
        const name = field?.[1];
        const type = field?.[2];
        return { name, type };
      }),
    };
  });

  return { models: parseModels };
};
