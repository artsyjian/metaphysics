import { GraphQLEnumType } from "graphql"

const Format = {
  type: new GraphQLEnumType({
    name: "Format",
    values: {
      HTML: {
        value: "html",
      },
      PLAIN: {
        value: "plain",
      },
      MARKDOWN: {
        value: "markdown",
      },
    },
  }),
}

export default Format
