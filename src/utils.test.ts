import * as utils from "./util";
import BN from "bn.js";

describe("Utility functions", () => {
  // it "get random int", ->
  it("get random int", () => {
    expect(utils.getRandomInt(0, 10)).toBeLessThanOrEqual(10);
  });

  it("Hash string with SHA256", () => {
    // precoumputed hash of "hello"
    expect(utils.hashMsgSHA256("hello")).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
  });
  it("Get byes size of type BN ", () => {
    expect(utils.getByteSize(new BN(0))).toBe(1);
    expect(utils.getByteSize(new BN("1111222233334444"))).toBe(4);
  });
});
