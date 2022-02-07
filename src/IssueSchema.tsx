export const issueSchema = {
    title: "issueSchema",
    description: "schema of issue model",
    version: 0,
    primaryKey: "title",
    type: "object",
    properties: {
        title: {
            type: "string"
        },
        description: {
            type: "string"
        },
        modelId: {
            type: "string"
        }
    },
    required: [
        'title',
        'description',
        'modelId',
    ]
}