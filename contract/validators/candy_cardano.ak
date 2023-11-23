use aiken/list
use aiken/interval.{Finite}
use aiken/hash.{Blake2b_224, Hash}
use aiken/transaction/credential.{VerificationKey}
use aiken/transaction.{Transaction, ScriptContext, Spend, ValidityRange}

type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

// type CandyTotal =
//   Int

type Datum {
  candy_total: Int,
  owner: VerificationKeyHash,
  //beneficiary: VerificationKeyHash,
}


validator {
    fn candy(datum: Datum, _redeemer: Void, ctx ScriptContext) {

        when ctx.purpose is {
            Spend(_) -> 
            and {
                must_be_signed_by(ctx.transaction, datum.owner),
                total_must_be_valid(ctx.transaction, datum.candy_total)
            }
            _ -> False
        }
    }
}

fn must_be_signed_by(transaction: Transaction, vk: VerificationKeyHash, candy_total: Int) {
    list.has(transaction.extra_signatories, vk)
}

fn total_must_be_valid(transaction: Transaction,candy_total: Int) -> Bool {
    check_sum_candy(transaction,candy_total) && check_sub_candy(transaction, candy_total)
}

fn check_sum_candy(transaction: Transaction, candy_total: Int) -> Bool {
    total_candy = list.foldl(transaction.outputs, fn(x.datum.candy_total, total) { x + total})
    total_candy == candy_total
}

fn check_sub_candy(transaction: Transaction, candy_total: Int) -> Bool {
    list.all(transaction.outputs, fun(x.datum.candy_total < candy_total))
}