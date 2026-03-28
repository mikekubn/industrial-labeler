import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { DatabaseService } from 'src/database/database.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserNotFoundException } from './http-exception/user-exception';

@Injectable()
export class InternalService {
  private readonly logger = new Logger(InternalService.name);
  private tokenStore = new Map<string, string>();

  constructor(private readonly prisma: DatabaseService) {}

  public async updateRole(body: UpdateUserRoleDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const createdUser = await this.prisma.user.update({
      data: {
        role: body.role,
      },
      where: {
        email: body.email,
      },
    });

    this.logger.log(`Updated user: ${JSON.stringify(createdUser)}`);
    return createdUser;
  }

  /**
   * If the event is emmited from auth, the token is stored for 10 minutes.
   */
  @OnEvent('user.password.reset', { async: true })
  void(payload: { email: string; token: string }) {
    this.logger.log(`Saving token for user: ${payload.email}`);

    this.tokenStore.set(payload.email, payload.token);

    setTimeout(
      () => {
        if (this.tokenStore.has(payload.email)) {
          this.tokenStore.delete(payload.email);
          this.logger.log(
            `Token for user ${payload.email} expired and was deleted.`,
          );
        }
      },
      10 * 60 * 1000,
    );
  }

  /**
   * Returns the token for the user and deletes it from the store.
   * @param email
   * @returns
   */
  public getTokenForUser(email: string) {
    const token = this.tokenStore.get(email);

    if (!token) {
      this.logger.warn(`No token found for user: ${email}`);
      return { token: null, message: 'No token found or expired' };
    }

    this.tokenStore.delete(email);

    return { token };
  }
}
