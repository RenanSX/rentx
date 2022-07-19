
import { v4 as uuiV4 } from "uuid";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity("users")
class User {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuiV4();
    }
    if (!this.isAdmin) {
      this.isAdmin = false;
    }
  }
}

export { User}