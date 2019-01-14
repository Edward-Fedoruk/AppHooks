import { schema } from 'normalizr'

const destination = new schema.Entity("destination")
const endpoint = new schema.Entity("endpoints", {
  stages: [destination]
})
const stages = new schema.Entity("stages", {
  stages: [endpoint] 
}, {
  idAttribute: (value, parent) => `${parent.id}-${value.id}`
})
export const channelSchema = new schema.Entity("channels", { 
  stages: [stages]
})
export const channelsSchema = new schema.Array(channelSchema)