import { BasePiece } from './BasePiece';
import King from './King';

export type BasePieceInstance = InstanceType<new () => BasePiece>;
export type KingInstance = InstanceType<typeof King>;
