import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptService {
  private salt: string;
  constructor() {
    this.salt = bcrypt.genSaltSync(10);
  }
  genHash(plainPassword: string): string {
    return bcrypt.hashSync(plainPassword, this.salt);
  }
  compare(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}
