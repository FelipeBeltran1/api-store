import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private UserService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.UserService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) return user;
    return null;
  }
}
