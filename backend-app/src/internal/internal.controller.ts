import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@thallesp/nestjs-better-auth';

import { ApiStandardResponse } from 'src/decorators/api-response.decorator';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRequestTokenDto } from './dto/user-request-token.dto';
import { InternalService } from './internal.service';

@ApiTags('internal')
@Controller('internals')
export class InternalController {
  constructor(private readonly internalService: InternalService) {}

  @Patch('update-role')
  @ApiStandardResponse({
    type: UpdateUserRoleDto,
    description: 'User role updated successfully',
  })
  public async updateRole(@Body() body: UpdateUserRoleDto) {
    const record = await this.internalService.updateRole(body);

    return record;
  }

  @Get('token')
  @Roles(['admin'])
  @ApiStandardResponse({
    type: UserRequestTokenDto,
    description: 'Token for user',
  })
  public getToken(@Query('email') email: string) {
    const token = this.internalService.getTokenForUser(email);

    return token;
  }
}
