import * as utils from "./util";
import BN from "bn.js";


describe("Utility functions", () => {
  // it "get random int", ->
  it("get random int", () => {
    expect(utils.getRandomInt(0, 10)).toBeLessThanOrEqual(10);
  });

  it("Hash string with SHA256", () => {
    // precoumputed hash of "hello"
    expect(utils.hashMsgSHA256("hello")).toBeInstanceOf(BN)
    expect(utils.hashMsgSHA256("hello")).toEqual(new BN("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824", "hex"))
  });

  it("Get concatenated classNames", () => {
    expect(utils.classNames("a", "b", "c")).toBe("a b c");
  });
  it("Parse Bytes to array", () => {
    expect(Array.isArray(utils.parseBytes("0x1234567890"))).toEqual(true);
  });
  
});
