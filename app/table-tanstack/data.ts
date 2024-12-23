import { faker } from "@faker-js/faker";
import { User } from "./types";

faker.seed(124);

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthDate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    age: faker.number.int({ max: 100, min: 1 }),
  };
}

export const USERS: User[] = faker.helpers
  .multiple(createRandomUser, {
    count: 100,
  })
  .map((data, index) => ({ ...data, id: index }));
