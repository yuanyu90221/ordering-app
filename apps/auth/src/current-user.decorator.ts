import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './users/schemas/user.schema';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    console.log('test1', context.switchToHttp().getRequest());
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    console.log('test2', context.switchToRpc().getData());
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
