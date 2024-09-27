import { Model, ModelConnection } from "./SchemaVisualizer.types";

export const getInfoFromSchema = (
  schema: String
): { models: Model[]; connections: ModelConnection[] } => {
  const modelStrings = Array.from(
    schema.matchAll(/model \w+{[\w\s:;\[\]]+}/g)
  ).map((i) => i[0]);

  // console.log(modelStrings);

  const modelNames = modelStrings.map((modelString) => {
    return Array.from(modelString.matchAll(/model (\w+)/g))?.[0]?.[1];
  });

  // console.log(modelNames);

  const parsedModels: Model[] = modelStrings.map((modelString, index) => {
    return {
      name: modelNames[index],
      fields: Array.from(modelString.matchAll(/(\w+): (\w+)/g)).map((field) => {
        const name = field?.[1];
        const type = field?.[2];
        return {
          name,
          type,
          hasConnections: !!modelNames?.find((modelName) =>
            type?.includes(modelName)
          ),
        };
      }),
    };
  });

  const connections: ModelConnection[] = [];
  parsedModels.forEach((model) => {
    model.fields.forEach((field) => {
      const connection = modelNames?.find((modelname) =>
        field?.type?.includes(modelname)
      );
      // console.log(connection);

      if (connection) {
        connections.push({
          target: connection,
          source: model.name,
          name: field.name,
        });
      }
    });
  });

  return {
    models: parsedModels.map((model) => ({
      ...model,
      isChild: parsedModels.some((parsedModel) =>
        parsedModel.fields.find((field) => field.type?.includes(model.name))
      ),
    })),
    connections: connections,
  };
};
