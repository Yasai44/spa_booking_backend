import NodeEnvironment from "jest-environment-node";
import { execSync } from "child_process";

export default class PrismaTestEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    execSync("npx prisma migrate reset --force --skip-seed", {
      stdio: "inherit"
    });
  }
}
