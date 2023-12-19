import { type TApiResponse } from '../types';
import { ZUser, type TUser } from '../types/user.type';

export class UserService {
  private static host = (process.env.BACKEND_HOST as string) + '/v1/user';

  static async getDetails(
    uuid: TUser['uuid'],
    authOptions: Pick<TUser, 'uuid' | 'password'>
  ): Promise<[TUser | null, Error | null]> {
    try {
      const query = new URLSearchParams({ uuid });
      const response = await fetch(`${this.host}?${query.toString()}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${authOptions.uuid}.${authOptions.password}`,
        },
      });
      const json = (await response.json()) as TApiResponse<TUser>;
      if (json.status !== 200) return [null, new Error(json.message!)];

      const parsingResult = ZUser.safeParse(json.data);
      if (!parsingResult.success) throw new Error(parsingResult.error.message);
      return [parsingResult.data, null];
    } catch (error) {
      console.error(error);
      return [null, error as Error];
    }
  }
}
