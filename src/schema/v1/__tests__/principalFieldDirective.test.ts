import { graphql, parse, Source } from "graphql"
import { HTTPError } from "lib/HTTPError"
import { principalFieldDirectiveExtension } from "extensions/principalFieldDirectiveExtension"

const schema = require("schema/v1").default
const queryToAst = query => parse(new Source(query))

describe(principalFieldDirectiveExtension, () => {
  it("returns the underlying error when occurring on a tagged field", async () => {
    const query = `
      {
        artwork(id: "test") @principalField {
          id
        }
      }
    `

    const args = {
      schema,
      source: query,
      contextValue: {
        artworkLoader: () => Promise.reject(new HTTPError("not found", 404)),
      },
    }

    const result = await graphql(args)
    const extensions = principalFieldDirectiveExtension(
      queryToAst(query),
      result
    )
    expect(extensions).toEqual({ principalField: { httpStatusCode: 404 } })
  })
})
