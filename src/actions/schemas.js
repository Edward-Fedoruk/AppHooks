import { schema } from 'normalizr'

export const destinationSchema = new schema.Entity("destination")
export const endpointSchema = new schema.Entity("endpoints", {stages: [destinationSchema]})
export const stageSchema = new schema.Entity("stages", {endpoints: [endpointSchema]})
export const channelSchema = new schema.Entity("channels", {stages: [stageSchema]})