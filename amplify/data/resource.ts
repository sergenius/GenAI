import {
  type ClientSchema,
  a,
  defineData,
} from "@aws-amplify/backend";

const schema = a.schema({
  // Chat route for handling AI conversations
  chat: a.conversation({
    aiModel: a.ai.model("Claude 3 Haiku"),
    systemPrompt: `
    You are a helpful assistant for food-related queries. 
    You can:
    - Provide a list of meal names if asked for meals (#list of meals).
    - Provide detailed recipes with ingredients and step-by-step instructions if asked for a specific meal.
    - Calculate and list total ingredient quantities across multiple recipes.
    - Suggest nearby supermarkets based on the user’s city if asked where to find ingredients. 
    Always clarify the user's intent before responding.
    `,
  }),

  // Route for generating descriptive chat names
  chatNamer: a.generation({
    aiModel: a.ai.model("Claude 3 Haiku"),
    systemPrompt: `You are a helpful assistant that writes descriptive names for conversations. Names should be 2-10 words long.`,
  })
    .arguments({
      content: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
      })
    )
    .authorization((allow) => [allow.authenticated()]),

  // Route for generating recipes
  generateRecipe: a.generation({
    aiModel: a.ai.model("Claude 3 Haiku"),
    systemPrompt: "You are a helpful assistant that generates recipes.",
  })
    .arguments({
      description: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
        ingredients: a.string().array(),
        instructions: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
