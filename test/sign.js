import {metaMaskUtil} from "../src/wallet/metaMaskUtil";

describe("generate key_pair test", function () {
    this.timeout(100000);
    before( async () => {
    });

    it("send tx using metamask", async () => {
        metaMaskUtil.getAddress();
    });
});
