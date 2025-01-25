// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required']
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required']
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required']
//     },
//     img: {
//         type: String,
//     },
//     roles: {
//         type: [String],
//         default: ['USER_ROLE'],
//         enum: ['USER_ROLE','ADMIN_ROLE']
//     }
// });

// export const UserModel = mongoose.model('User', userSchema);


import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DataSource,
    Repository,
  } from "typeorm";
import { PostgresDatabase } from "../pg-database";
  
  @Entity("users") 
  class User {
    @PrimaryGeneratedColumn("uuid") 
    id!: string;
  
    @Column({ type: "varchar", length: 255, nullable: false })
    name!: string;
  
    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    email!: string;
  
    @Column({ type: "text", nullable: false })
    password!: string;
  
    @Column({ type: "varchar", length: 255, nullable: true })
    img?: string;
  
    @Column({
      type: "text",
      array: true,
      default: ["USER_ROLE"], 
    })
    roles!: string[];
  
    // @CreateDateColumn() 
    // createdAt!: Date;
  
    // @UpdateDateColumn() 
    // updatedAt!: Date;
  }
  
  let UserModel: Repository<User> | null = null;

  export const initializeUserModel = async () => {
      const dataSource = PostgresDatabase.getDataSource();
      UserModel = dataSource.getRepository(User);
  };
  
  export { User, UserModel };