This document captures the changes between starknet.js 3.18.2 and 4.4.2 (v4)
to help people with the migration.

The motivation for v4 seems to be:

- The introduction of support for the JSON-RPC api. That is important to
  enable the permissionless side of Starknet. However, it still not fully
  implemented and requires some efforts from the node like Pathfinder to comply
  to the latest Starknet JSON-RPC API. So I would say that we probably delay
  this part as dapp developer.
- Some optimisation and, for instance, the removal of the 120k of output for
  every block that are queried with the getBlock of v3.

> We are curious to see how the abstraction will ne maintained, since, for
> instance JSON-RPC v0.2 introduced different ways to look at the block, like
> `starknet_getBlockWithTx` and `starknet_getBlockWithTxHashes`...

There is another change to come and that is the removal of the
`entry_point_selector` field from invoke transaction to move to invokeTxnV1.
Not sure if/how it will impact dapps but at least starknet-js must have that
change because wallets are using it. And that is pretty obvious that that feature
will not be backported. Anyway, one day at a time!

The document is organized in 2 sections:

- Some general guidance/thoughts about the impacts of the changes
- A more detailed comparaison of the Provider and Account Interfaces between
  the 2 releases. This also covers the changed to come in the `get-starknet`
  StarknetWindowOnject interface

As a general warning, the study is based on 4.4.2 as a target. At the time of
the writing, 4.5.0 is already labeled even if it is not yet latest.

# General Guidance

The table below tries to sort the issues you may or may not face during your
migration. It includes an attempt to sort them in term of risk based on the
ability to detect the error, the severity of the error and occurrence of the
error in our own work. Risk is low does not mean you will not be biten hard
by it!

> Important:
> This document does not analyse the changes in the output when the type name
> did not change except for `GetBlockResponse`. You might very likely be biten 
> here too!

- (High/General) If you are running 3.18 with a ^3.x rule (18 >= x) in the
  `package.json` then next time you run an npm install from scratch you will
  get 3.19 which is (likely) not compatible. The reason is 3.19 has been
  misslabeled it should have been named `4.0.0-alpha`. A quick fix consists
  in fixing the version to 3.18.2 in your package.json file.
- (High/Provider) some payloads significantly differ between the 2 versions.
  [types.test.ts](./src/types.test.ts) and
  [providers.test.ts](./src/providers.test.ts) provide basic illustrations of
  that point. For instance:
  - `GetBlockResponse` has removed the details of the transactions and
    returns a simple array of transaction hashes.
  - `AddTransactionResponse` has been replaced with `InvokeFunctionResponse`
    and as an other example, `code: "TRANSACTION_RECEIVED"` has been remove
    which will break @starknet-react/core `useStarknetTransactionManager`
    hook
- (Moderate/Provider) `getTransactionStatus` has been removed from the
  interface. You will want to use `getTransactionReceipt`
- (Low/Account) `deployContract` has been removed from the API. You probably
  do not use that but worth checking
- (Low/Provider) the structure of the 2nd parameter (blockNumber) in
  `callContract` has changed
- (Low/Provider) Use of `getCode` is deprecated. You should not use
  `getClassAt`
- (Low/Provider) The output of `getStorageAt` has been changed from `Object`
  to `BigNumberish`.
- (Low/Provider) Use of one of the sequencer properties `baseURL`, 
  `feederGatewayUrl` and `gatewayUrl`. You should use the `chainId`
- (Low/Provider) `getContractAddresses()` has been removed from the API. You
  very unlikely use it already
- (Very Low/Provider) a number of parameter names have changed between the 2
  release but since JS/TS does not properly support named parameter, the
  impact should be very low. This includes `callContract`, `getTransaction`,
  `getTransactionReceipt`

# Detailed Analysis

[//]: <> ######################################################################
[//]: <> ProviderInterface
[//]: <> ######################################################################
[//]: <> ######################################################################

## ProviderInterface

The provide interface does not provide any integration with the account but it
is very useful to query the blockchain.

### Public Properties

v4 does some relevant cleanup when opening the possibility for RPC. 

- v3

```typescript
public abstract baseUrl: string;
public abstract feederGatewayUrl: string;
public abstract gatewayUrl: string;
public abstract chainId: StarknetChainId;
```

- v4

```typescript
public abstract chainId: StarknetChainId;
```

### getContractAddresses

`getContractAddresses` has been removed from v4

### callContract

The second parameter that was `options` and could only have one property in
it has been flatten.

- v3

```typescript
public abstract callContract(
  invokeTransaction: Call,
  options: {
    blockIdentifier: BlockIdentifier;
  }
): Promise<CallContractResponse>;
```

- v4

```typescript
public abstract callContract(
  call: Call,
  blockIdentifier?: BlockIdentifier
): Promise<CallContractResponse>;
```

### getBlock

blockIdentifier has been moved from non mandatory to mandatory but the change
is due to the fact there is now a default value set to "pending" so it should
not have any impact.

On the other hand, the 2 scripts differs in the following way:

- v4 has now an array of transaction hash instead of the transactions with the
  associated events
- v4 has added `timestamp`
- v4 has renamed `parent_block_hash` into `parent_hash`
- v4 removed `sequencer`, `gas_price` or `starknet_version`

- v3 

```typescript
public abstract getBlock(
    blockIdentifier?: BlockIdentifier
  ): Promise<GetBlockResponse>;
```

```json
{
 "block_hash": "0x3e1c048ef0171b5a9fdfa5df22e0f223a0d44860f656358ba2e930e567a40de",
 "parent_block_hash": "0x7ed6917c6f426be0ff154f65f7e2d593c3def6166fd0f54890cdd3326130b4c",
 "block_number": 329958,
 "state_root": "0715661dd96b4e528a3f0a342cf2f785ddb55d50b5564125901f12eb1bb7f9ec",
 "status": "ACCEPTED_ON_L2",
 "gas_price": "0x5f5e0fa",
 "transactions": [
  {
   "version": "0x0",
   "contract_address": "0x494b1995e0c316a36c99b956485b15acc558849cd825749887f1aaa4333fdf",
   "entry_point_selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
   "entry_point_type": "EXTERNAL",
   "calldata": [
    "0x2",
    "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
    "0x0",
    "0x3",
    "0xdeacbc83303420ea41fd3720c205a7779b025f9f3f6515ac10cabb666ff207",
    "0xc73f681176fc7b3f9693986fd7b14581e8d540519e27400e88b8713932be01",
    "0x3",
    "0x3",
    "0x6",
    "0xdeacbc83303420ea41fd3720c205a7779b025f9f3f6515ac10cabb666ff207",
    "0x2386f26fc10000",
    "0x0",
    "0x2386f26fc10000",
    "0x0",
    "0x494b1995e0c316a36c99b956485b15acc558849cd825749887f1aaa4333fdf",
    "0x41f"
   ],
   "signature": [
    "0x1225bdc3e9559053e279cfb6f7a5e18de5cf1ae58fcfa550ef70cb4fee66006",
    "0x10aab9cc27593502173d02cac7db2f77e5101e0dfcd7f9da21710db3eae747e"
   ],
   "transaction_hash": "0x538570a3068211d7087d2dfca5456a69977fcaeca05f93c237e23c700dcff4f",
   "max_fee": "0x807cd252b78",
   "type": "INVOKE_FUNCTION"
  },
  ...
 ],
 "starknet_version": "0.10.0"
}```


- v4 

```typescript
public abstract getBlock(
    blockIdentifier: BlockIdentifier
  ): Promise<GetBlockResponse>;
```

```json
{
 "timestamp": 1662815129,
 "block_hash": "0x3e1c048ef0171b5a9fdfa5df22e0f223a0d44860f656358ba2e930e567a40de",
 "block_number": 329958,
 "new_root": "0715661dd96b4e528a3f0a342cf2f785ddb55d50b5564125901f12eb1bb7f9ec",
 "parent_hash": "0x7ed6917c6f426be0ff154f65f7e2d593c3def6166fd0f54890cdd3326130b4c",
 "status": "ACCEPTED_ON_L2",
 "transactions": [
  "0x538570a3068211d7087d2dfca5456a69977fcaeca05f93c237e23c700dcff4f",
  "..."
 ]
}
```

### getCode

`getCode` is now deprecated

- v3

```typescript
public abstract getCode(
  contractAddress: string,
  blockIdentifier?: BlockIdentifier
): Promise<GetCodeResponse>;
```

- v4 

```typescript
public abstract getCode(
  contractAddress: string,
  blockIdentifier?: BlockIdentifier
): Promise<GetCodeResponse>;
```

### getClassAt

`getClassAt` has been introduced in v4. It replaces `getCode`

```typescript
public abstract getClassAt(
  contractAddress: string,
  blockIdentifier?: BlockIdentifier
): Promise<ContractClass>;
```

### getStorageAt

The output of `getStorageAt` has been changed from `Object` to `BigNumberish`.

- v3 

```typescript
public abstract getStorageAt(
  contractAddress: string,
  key: BigNumberish,
  blockIdentifier?: BlockIdentifier
): Promise<object>;
```

- v4 

```typescript
  public abstract getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier
  ): Promise<BigNumberish>;
```

### getTransaction

The name of the parameter has changed.

- v3

```typescript
public abstract getTransaction(
    txHash: BigNumberish
  ): Promise<GetTransactionResponse>;
```

- v4 

```typescript
public abstract getTransaction(
    transactionHash: BigNumberish
  ): Promise<GetTransactionResponse>;
```

### getTransactionStatus

`getTransactionStatus` has been removed from v4.

- v3

```
public abstract getTransactionStatus(
    txHash: BigNumberish
): Promise<GetTransactionStatusResponse>;
```

### getTransactionReceipt

Only the name for the parameter 1st has changed which should have a limited
impact.

- v3

```typescript
public abstract getTransactionReceipt(
    txHash: BigNumberish
  ): Promise<TransactionReceiptResponse>;
```

- v4 

```typescript
public abstract getTransactionReceipt(
    transactionHash: BigNumberish
  ): Promise<GetTransactionReceiptResponse>;
```

### deployContract

deployContract has changed the output because of the change on the (starknet)
network that differs from v0.9.1 to v0.10.0. To support the latest release,
you will have to migrate to v4 verly likely:

- v3

```typescript
public abstract deployContract(
    payload: DeployContractPayload
  ): Promise<AddTransactionResponse>;
```

- v4 

```typescript
public abstract deployContract(
  payload: DeployContractPayload
): Promise<DeployContractResponse>;
```

### declareContract

`declareContract` is a new feature that comes with starknet v0.10.0. It was not
available with v3

- v4

```typescript
public abstract declareContract(
    payload: DeclareContractPayload
  ): Promise<DeclareContractResponse>;
```

### invokeFunction

`invokeFunction` has changed both in and out. That is because v3 was supporting
v0.9.0 of the network when v4 supports v0.10.0. As a result, the types changes
between the 2 calls.

- v3

```
 public abstract invokeFunction(
    invocation: Invocation
  ): Promise<AddTransactionResponse>;
```

- v4

```typescript
public abstract invokeFunction(
    invocation: Invocation,
    details?: InvocationsDetails
  ): Promise<InvokeFunctionResponse>;
```

### getEstimateFee

#### V4 

```typescript
public abstract getEstimateFee(
    invocation: Invocation,
    blockIdentifier: BlockIdentifier,
    details?: InvocationsDetails
  ): Promise<EstimateFeeResponse>;
```

### waitForTransaction

This call did not change.

- v3

```typescript
public abstract waitForTransaction(
  txHash: BigNumberish,
  retryInterval?: number
): Promise<void>;
```

- v4

```typescript
public abstract waitForTransaction(
  txHash: BigNumberish, 
  retryInterval?: number
): Promise<void>;
```


[//]: <> ######################################################################
[//]: <> SignerInterface
[//]: <> ######################################################################
[//]: <> ######################################################################


## SignerInterface

The signer interface provide the basic tools to sign and verify messages and
transactions. This class did not change probably because the move to v1 is not
done yet.

### getPubKey

- v3

```typescript
  public abstract getPubKey(): Promise<string>;
```

  public abstract getPubKey(): Promise<string>;

### signMessage

It did not change which makes sense.

- v3

```typescript
public abstract signMessage(
  typedData: TypedData, 
  accountAddress: string
): Promise<Signature>;
```

- v3

```typescript
public abstract signMessage(
  typedData: TypedData,
  accountAddress: string
): Promise<Signature>;
```

### signTransaction

It does not have any changes. As a matter of fact the Invocation has a property
`selector` in it which I am not sure why.

- v3

```typescript
public abstract signTransaction(
  transactions: Invocation[],
  transactionsDetail: InvocationsSignerDetails,
  abis?: Abi[]
): Promise<Signature>;
```

- v4

```typescript
public abstract signTransaction(
  transactions: Invocation[],
  transactionsDetail: InvocationsSignerDetails,
  abis?: Abi[]
): Promise<Signature>;
```

[//]: <> ######################################################################
[//]: <> AccountInterface
[//]: <> ######################################################################
[//]: <> ######################################################################

## AccountInterface

### Public Properties

This does not change.

- v3

```typescript
public abstract address: string;
public abstract signer: SignerInterface;
```

- v4

```typescript
public abstract address: string;
public abstract signer: SignerInterface;
```

### estimateFee

The output has changed significantly the 2 interfaces.

- v3

```typescript
public abstract estimateFee(
  calls: Call | Call[],
  estimateFeeDetails?: EstimateFeeDetails
): Promise<EstimateFee>;

export interface EstimateFee {
    amount: BN;
    unit: string;
    suggestedMaxFee: BN;
}
```

- v4

```typescript
public abstract estimateFee(
  calls: Call | Call[],
  estimateFeeDetails?: EstimateFeeDetails
): Promise<EstimateFeeResponse>;

export interface EstimateFeeResponse {
    overall_fee: BN;
    gas_consumed?: BN;
    gas_price?: BN;
}
```

### execute

The outpout has moved from `AddTransactionResponse` to
`InvokeFunctionResponse`. The later only returns the `transaction_hash`
when the former was sending back more information, including the contract
and a `code`

- v3

```typescript
  public abstract execute(
    transactions: Call | Call[],
    abis?: Abi[],
    transactionsDetail?: InvocationsDetails
  ): Promise<AddTransactionResponse>;

type AddTransactionResponse = {
    code: "TRANSACTION_RECEIVED";
    transaction_hash: string;
    address?: string | undefined;
    class_hash?: string | undefined;
}
```

- v4

```typescript
public abstract execute(
  transactions: Call | Call[],
  abis?: Abi[],
  transactionsDetail?: InvocationsDetails
): Promise<InvokeFunctionResponse>;

export interface InvokeFunctionResponse {
  transaction_hash: string;
}
```

### signMessage

This does not change.

- v3

```typescript
public abstract signMessage(typedData: TypedData): Promise<Signature>;
```

- v4

```typescript
public abstract signMessage(typedData: TypedData): Promise<Signature>;
```

### hashMessage

This does not change.

- v3

```typescript
public abstract hashMessage(
  typedData: TypedData
): Promise<string>;
```

- v4

```typescript
public abstract hashMessage(
  typedData: TypedData
): Promise<string>;
```

### verifyMessage

This does not change.

- v3

```typescript
public abstract verifyMessage(
  typedData: TypedData,
  signature: Signature
): Promise<boolean>;
```

- v4

```typescript
public abstract verifyMessage(
  typedData: TypedData,
  signature: Signature
): Promise<boolean>;
```

### verifyMessageHash

This does not change.

- v3

```typescript
public abstract verifyMessageHash(
  hash: BigNumberish, 
  signature: Signature
): Promise<boolean>;
```

- v4

```typescript
public abstract verifyMessageHash(
  hash: BigNumberish, 
  signature: Signature
): Promise<boolean>;
```

### getNonce

This does not change on the API interface and, neither on the default
implementation as this is the extract of getNonce that we can assume does not
query the data from starknet:

```typescript
public async getNonce(): Promise<string> {
  const { result } = await this.callContract({
    contractAddress: this.address,
    entrypoint: 'get_nonce',
  });
  return toHex(toBN(result[0]));
}
```

Below are the definition of the 2 interfaces...

- v3

```typescript
public abstract getNonce(): Promise<string>;
```

- v4

```typescript
public abstract getNonce(): Promise<string>;
```

### deployContract

This API has been removed which makes sense in several cases.

- v3

```typescript
public abstract override deployContract(
  payload: DeployContractPayload,
  abi?: Abi
): Promise<AddTransactionResponse>;
```

[//]: <> ######################################################################
[//]: <> StarknetWindowObject
[//]: <> ######################################################################
[//]: <> ######################################################################

### StarknetWindowObject (get-starknet)

### Public Properties

There is only a few changes on that side, even if the project has been
completely reviewed. What is worth noting is:

- there are now 2 interfaces that are `ConnectedStarknetWindowObject` and
  `DisconnectedStarknetWindowObject` but except for that there is only a few
  changes in the interface.
- `enable` has lost the `showModal` options which I guess makes sense
  for the wallet because it is not a their choice but the choice of the app.
- `enable` has a new option that is `starknetVersion` with a default value.
  in the case of Argent-X, it is set to v4. Obviously it will be wallet
  dependant and it is not clear exactely what it means other than it will
  very likely change the wallet behaviour. 

- v1.5

```typescript
export interface IStarknetWindowObject {
    id: string;
    name: string;
    version: string;
    icon: string;
    request: <T extends RpcMessage>(call: Omit<T, "result">) => Promise<T["result"]>;
    enable: (options?: { showModal?: boolean }) => Promise<string[]>;
    isPreauthorized: () => Promise<boolean>;
    on: (event: EventType, handleEvent: EventHandler) => void;
    off: (event: EventType, handleEvent: EventHandler) => void;

    account: AccountInterface;
    provider: ProviderInterface;
    isConnected: boolean;
    /**
     * @deprecated use `account` instead
     */
    signer?: SignerInterface;
    selectedAddress?: string;
}
```

- v2

```typescript
interface IStarknetWindowObject {
  id: string
  name: string
  version: string
  icon: string
  request: <T extends RpcMessage>(
    call: Omit<T, "result">,
  ) => Promise<T["result"]>
  enable: (options?: { starknetVersion?: "v3" | "v4" }) => Promise<string[]>
  isPreauthorized: () => Promise<boolean>
  on: (
    event: WalletEvents["type"],
    handleEvent: WalletEvents["handler"],
  ) => void
  off: (
    event: WalletEvents["type"],
    handleEvent: WalletEvents["handler"],
  ) => void
  account?: AccountInterface
  provider: ProviderInterface
  selectedAddress?: string
  chainId?: string
}

export interface ConnectedStarknetWindowObject extends IStarknetWindowObject {
  isConnected: true
  account: AccountInterface
  selectedAddress: string
  chainId: string
}

interface DisconnectedStarknetWindowObject extends IStarknetWindowObject {
  isConnected: false
}

export type StarknetWindowObject =
  | ConnectedStarknetWindowObject
  | DisconnectedStarknetWindowObject
```
