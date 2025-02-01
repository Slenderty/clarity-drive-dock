import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
  name: "Ensure can create new ride",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get("wallet_1")!;
    
    let block = chain.mineBlock([
      Tx.contractCall(
        "drive-dock",
        "create-ride",
        [
          types.ascii("123 Main St"),
          types.ascii("456 Park Ave"),
          types.uint(1625097600),
          types.uint(4),
          types.uint(1000)
        ],
        wallet_1.address
      )
    ]);
    
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    assertEquals(block.receipts[0].result, "0");
  }
});

Clarinet.test({
  name: "Ensure can book available ride",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    // Test implementation
  }
});
