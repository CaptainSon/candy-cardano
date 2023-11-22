use aiken/list
use aiken/interval.{Finite}
use aiken/hash.{Blake2b_224, Hash}
use aiken/transaction/credential.{VerificationKey}
use aiken/transaction.{Transaction, ScriptContext, Spend, ValidityRange}

type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

type CandyTotal =
  Int

type Datum {
  candy_total: CandyTotal,
  owner: VerificationKeyHash,
  //beneficiary: VerificationKeyHash,
}


validator {
    fn candy(datum: Datum, _redeemer: Void, ctx ScriptContext) {
        Spend(_) -> 
        and {
            must_be_signed_by(ctx.transaction, datum.owner)
        }
    }
}

fn must_be_signed_by(transaction: Transaction, vk: VerificationKeyHash) {
    list.has(transaction.extra_signatories, vk)
}