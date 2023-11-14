import {Player} from "../models/Player";

export const PlayerSchema = {
  title: 'Player',
  version: 1,
  keyCompression: false,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    name: {
      type: 'string',
      default: ''
    },
    points: {
      type: 'number',
      default: ''
    },
    timestamp: {
      type: 'date-time'
    }
  },
  required: ['id', 'name', 'points', 'timestamp']
};
